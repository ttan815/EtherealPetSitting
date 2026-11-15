// Renders the per-row actions for the owner's Appointments table, plus the Decline Booking and Reschedule popups.
import { useEffect, useRef, useState } from "react";
import {
    acceptAppointment, cancelAppointment, dateFromToday, declineAppointment, formatDay, formatTime,
    getAvailableTimes, markAppointmentComplete, parseISODate, rescheduleAppointment, toISODate,
} from "../../../services/appointment-service";
import { WEEKDAYS } from "../../../constants/appointment";

/**
 * Renders the buttons for one appointment row, based on its status.
 * Request: Accept / Decline. In progress: Mark complete. Confirmed: Reschedule + "⋯". Completed and cancelled: View.
 * @param {Object} appointment The appointment for this row.
 * @param {Function} onAccept Called with the appointment when Accept is clicked.
 * @param {Function} onDecline Called with the appointment to open the Decline Booking popup.
 * @param {Function} onComplete Called with the appointment when Mark complete is clicked.
 * @param {Function} onReschedule Called with the appointment to open Reschedule.
 * @param {Function} onView Called with the appointment to open Appointment Details.
 * @param {Function} onCancel Called with the appointment when Cancel visit is picked from "⋯".
 * @returns {JSX.Element} The row actions.
 */
export default function AppointmentRowActions({ appointment, onAccept, onDecline, onComplete, onReschedule, onView, onCancel }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close the "⋯" menu when clicking anywhere else
    useEffect(() => {
        if (!menuOpen) return undefined;
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Row clicks open details, so buttons stop the click from reaching the row
    function run(action) {
        return (e) => {
            e.stopPropagation();
            setMenuOpen(false);
            action(appointment);
        };
    }

    switch (appointment.status) {
        case "request":
            return (
                <div className="ap-row-actions">
                    <button type="button" className="ap-btn ap-btn-primary ap-btn-sm" onClick={run(onAccept)}>Accept</button>
                    <button type="button" className="ap-btn ap-btn-outline ap-btn-sm" onClick={run(onDecline)}>Decline</button>
                </div>
            );
        case "in_progress":
            return (
                <div className="ap-row-actions">
                    <button type="button" className="ap-btn ap-btn-outline ap-btn-sm" onClick={run(onComplete)}>Mark complete</button>
                </div>
            );
        case "confirmed":
            return (
                <div className="ap-row-actions">
                    <button type="button" className="ap-link" onClick={run(onReschedule)}>Reschedule</button>
                    <div className="ap-menu" ref={menuRef}>
                        <button
                            type="button"
                            className="ap-menu-trigger"
                            aria-label="More actions"
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            onClick={(e) => { e.stopPropagation(); setMenuOpen((open) => !open); }}
                        >
                            ⋯
                        </button>
                        {menuOpen && (
                            <div className="ap-menu-list" role="menu">
                                <button type="button" role="menuitem" onClick={run(onView)}>View details</button>
                                <button type="button" role="menuitem" className="ap-menu-danger" onClick={run(onCancel)}>Cancel visit</button>
                            </div>
                        )}
                    </div>
                </div>
            );
        default:
            return (
                <div className="ap-row-actions">
                    <button type="button" className="ap-link" onClick={run(onView)}>View</button>
                </div>
            );
    }
}

// TODO: reusable <Modal> component not available
/**
 * Renders a centered popup with a dimmed backdrop; closes on Escape, backdrop click or ×.
 * @param {boolean} wide Uses the wider layout (Reschedule, Appointment Details).
 * @param {string} label Accessible name for the dialog.
 * @param {Function} onClose Called when the popup should close.
 * @param {import("react").ReactNode} children The popup content.
 * @returns {JSX.Element} The popup.
 */
export function PopupFrame({ wide, label, onClose, children }) {
    useEffect(() => {
        function handleKey(e) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <div className="ap-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className={`ap-popup ${wide ? "ap-popup-wide" : ""}`} role="dialog" aria-modal="true" aria-label={label}>
                <button type="button" className="ap-popup-close" aria-label="Close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}

/**
 * Renders the Decline Booking popup with an optional message to the customer.
 * @param {Object} appointment The booking request being declined.
 * @param {Function} onClose Closes the popup without declining.
 * @param {Function} onConfirm Called with the message when Decline request is clicked.
 * @returns {JSX.Element} The popup.
 */
export function DeclineBookingPopup({ appointment, onClose, onConfirm }) {
    const [message, setMessage] = useState("");
    const refund = appointment.payment === "deposit_paid"
        ? `${appointment.customer} will be notified, and their $${appointment.deposit} deposit will be refunded.`
        : `${appointment.customer} will be notified.`;

    return (
        <PopupFrame label="Decline booking request" onClose={onClose}>
            <div className="ap-popup-head">
                <span className="ap-popup-icon ap-popup-icon-danger" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" /></svg>
                </span>
                <div>
                    <h2 className="ap-popup-title">Decline {appointment.pet}’s booking request?</h2>
                    <p className="ap-popup-subtitle">{refund}</p>
                </div>
            </div>
            <label className="ap-field">
                <span className="ap-field-label">Message to the customer <span className="ap-optional">Optional</span></span>
                <textarea
                    className="ap-input ap-textarea"
                    placeholder="e.g. Sorry, we’re fully booked that weekend."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoFocus
                />
            </label>
            <div className="ap-popup-actions">
                <button type="button" className="ap-btn ap-btn-outline" onClick={onClose}>Cancel</button>
                <button type="button" className="ap-btn ap-btn-danger" onClick={() => onConfirm(message.trim())}>Decline request</button>
            </div>
        </PopupFrame>
    );
}

// Builds the 6-week grid for a month, starting on Monday
function monthGrid(year, month) {
    const first = new Date(year, month, 1);
    const start = new Date(year, month, 1 - ((first.getDay() + 6) % 7));
    return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

/**
 * Renders the Reschedule Appointment modal with a calendar and available times.
 * @param {Object} appointment The appointment being moved.
 * @param {Function} onClose Keeps the current appointment.
 * @param {Function} onConfirm Called with { date, time } when Confirm Reschedule is clicked.
 * @returns {JSX.Element} The modal.
 */
export function RescheduleModal({ appointment, onClose, onConfirm }) {
    const today = dateFromToday(0);
    const startDate = appointment.date < today ? today : appointment.date;
    const [view, setView] = useState(() => {
        const d = parseISODate(startDate);
        return { year: d.getFullYear(), month: d.getMonth() };
    });
    const [date, setDate] = useState(startDate);
    const [time, setTime] = useState(appointment.time);
    const [error, setError] = useState("");

    const slots = getAvailableTimes(date);
    const current = parseISODate(appointment.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const days = monthGrid(view.year, view.month);

    function changeMonth(step) {
        setView(({ year, month }) => {
            const d = new Date(year, month + step, 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });
    }

    function pickDate(iso) {
        setDate(iso);
        setError("");
        // Drop the time if it's not open on the new day
        if (!getAvailableTimes(iso).some((s) => s.time === time && s.available)) setTime("");
    }

    function handleConfirm() {
        if (!date || !time) {
            setError("Pick a date and a time.");
            return;
        }
        if (date === appointment.date && time === appointment.time) {
            setError("Pick a different date or time to reschedule.");
            return;
        }
        onConfirm({ date, time });
    }

    return (
        <PopupFrame wide label="Reschedule appointment" onClose={onClose}>
            <div>
                <h2 className="ap-popup-title">Reschedule Appointment</h2>
                <p className="ap-popup-subtitle">Pick a new date and time. Your deposit carries over.</p>
            </div>

            <div className="ap-current">
                <span className="ap-current-dot" aria-hidden="true" />
                <div>
                    <div className="ap-cell-main">Current Appointment: {appointment.service} with {appointment.pet}</div>
                    <div className="ap-cell-sub">Scheduled for: {current} @ {formatTime(appointment.time)}. No fee for rescheduling.</div>
                </div>
            </div>

            <div className="ap-reschedule-grid">
                <div className="ap-panel">
                    <div className="ap-cal-head">
                        <h3 className="ap-panel-title">{monthLabel}</h3>
                        <div className="ap-cal-nav">
                            <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>‹</button>
                            <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>›</button>
                        </div>
                    </div>
                    <div className="ap-cal">
                        {WEEKDAYS.map((d) => <span key={d} className="ap-cal-weekday">{d}</span>)}
                        {days.map((d) => {
                            const iso = toISODate(d);
                            const inMonth = d.getMonth() === view.month;
                            const past = iso < today;
                            return (
                                <button
                                    key={iso}
                                    type="button"
                                    className={`ap-cal-day ${iso === date ? "ap-cal-day-selected" : ""}`}
                                    disabled={!inMonth || past}
                                    onClick={() => pickDate(iso)}
                                    aria-label={d.toDateString()}
                                    aria-pressed={iso === date}
                                >
                                    {d.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="ap-panel">
                    <h3 className="ap-panel-title">Available Times</h3>
                    <p className="ap-cell-sub">Selected Date: {formatDay(date, true) === "Today" ? `Today, ${formatDay(date, false)}` : formatDay(date, true)}</p>
                    {["morning", "afternoon"].map((period) => (
                        <div key={period} className="ap-times">
                            <span className="ap-times-label">{period}</span>
                            <div className="ap-times-row">
                                {slots.filter((s) => s.period === period).map((s) => (
                                    <button
                                        key={s.time}
                                        type="button"
                                        className={`ap-time ${time === s.time ? "ap-time-selected" : ""}`}
                                        disabled={!s.available}
                                        onClick={() => { setTime(s.time); setError(""); }}
                                    >
                                        {formatTime(s.time)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {error && <p className="ap-error">{error}</p>}

            <div className="ap-popup-actions ap-popup-actions-split">
                <button type="button" className="ap-btn ap-btn-outline" onClick={onClose}>Keep Current Appointment</button>
                <button type="button" className="ap-btn ap-btn-primary" onClick={handleConfirm}>Confirm Reschedule</button>
            </div>
        </PopupFrame>
    );
}
