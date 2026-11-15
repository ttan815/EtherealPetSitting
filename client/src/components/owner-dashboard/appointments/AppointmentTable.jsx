// Renders the appointment table and the Appointment Details popup for the owner's Appointments section.
import AppointmentRowActions, { PopupFrame } from "./AppointmentRowActions";
import { STATUS_LABELS } from "../../../constants/appointments/appointment";
import { assignSitter, dateLines, formatDay, formatTime } from "../../../services/owner-dashboard/appointment-service";
import { useEffect, useState } from "react";

function cleanPrice(value) {
    const cleaned = value.replace(/[^\d.]/g, "");
    const [whole, ...decimals] = cleaned.split(".");
    return decimals.length ? `${whole}.${decimals.join("").slice(0, 2)}` : whole;
}

const PawIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <ellipse cx="6" cy="10" rx="2" ry="2.6" /><ellipse cx="10" cy="6" rx="2" ry="2.6" /><ellipse cx="14" cy="6" rx="2" ry="2.6" /><ellipse cx="18" cy="10" rx="2" ry="2.6" />
        <path d="M12 11c-3 0-6 4-6 6.5 0 1.7 1.4 2.5 3 2.5 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.6 0 3-.8 3-2.5C18 15 15 11 12 11z" />
    </svg>
);

/**
 * Renders a status pill.
 * @param {string} status The appointment status.
 * @returns {JSX.Element} The pill.
 */
export function StatusPill({ status }) {
    // TODO: reusable <StatusBadge> component not available
    return (
        <span className={`ap-pill ap-pill-${status}`}>
            {status === "completed" && <span aria-hidden="true">✓ </span>}
            {STATUS_LABELS[status]}
        </span>
    );
}

/**
 * Renders the appointment table. Clicking a row opens Appointment Details.
 * @param {Array<Object>} appointments The appointments to show (already filtered).
 * @param {string} activeTab The selected tab, used for the empty message.
 * @param {Object} handlers Row action callbacks passed to AppointmentRowActions.
 * @returns {JSX.Element} The table.
 */
export default function AppointmentTable({ appointments, activeTab, handlers, sitters }) {
    const emptyTitle = activeTab === "all" ? "No appointments" : `No ${activeTab} appointments`;

    return (
        <div className="ap-table-card">
            <table className="ap-table">
                <thead>
                    <tr>
                        <th>Pet &amp; customer</th>
                        <th>Service</th>
                        <th>Date &amp; time</th>
                        <th>Sitter</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th className="ap-th-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 && (
                        <tr>
                            <td colSpan={7} className="ap-empty">
                                <div className="ap-empty-title">{emptyTitle}</div>
                                <div className="ap-cell-sub">{activeTab === "cancelled" ? "Cancelled visits will show up here." : "Try a different filter."}</div>
                            </td>
                        </tr>
                    )}
                    {appointments.map((a) => {
                        const [dayLine, timeLine] = dateLines(a);
                        return (
                            <tr
                                key={a.id}
                                className="ap-row"
                                tabIndex={0}
                                onClick={() => handlers.onView(a)}
                                onKeyDown={(e) => e.key === "Enter" && e.target === e.currentTarget && handlers.onView(a)}
                            >
                                <td>
                                    <div className="ap-pet">
                                        <span className="ap-avatar"><PawIcon /></span>
                                        <span>
                                            <span className="ap-cell-main">{a.pet} · {a.breed}</span>
                                            <span className="ap-cell-sub">{a.customer}</span>
                                        </span>
                                    </div>
                                </td>
                                <td className="ap-cell-text">{a.service}</td>
                                <td>
                                    <span className="ap-cell-main ap-cell-normal">{dayLine}</span>
                                    <span className="ap-cell-sub">{timeLine}</span>
                                </td>
                                <td onClick={(event) => event.stopPropagation()}>
                                    {a.status === "request" ? (
                                        <SitterSelect appointment={a} sitters={sitters} onChange={handlers.onSitterChange} />
                                    ) : (
                                        <span className={a.sitter ? "ap-cell-text" : "ap-cell-muted"}>{a.sitter ?? "Unassigned"}</span>
                                    )}
                                </td>
                                <td onClick={(event) => event.stopPropagation()}>
                                    {a.status === "request" ? (
                                        <AppointmentPriceField appointment={a} onPriceChange={handlers.onPriceChange} />
                                    ) : (
                                        <span className="ap-cell-text">${Number(a.price ?? Number(a.deposit || 0) + Number(a.balance || 0)).toFixed(2)}</span>
                                    )}
                                </td>
                                <td><StatusPill status={a.status} /></td>
                                <td className="ap-td-actions">
                                    <AppointmentRowActions appointment={a} {...handlers} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function SitterSelect({ appointment, sitters, onChange }) {
    return (
        <select
            className="ap-input ap-table-sitter-select"
            aria-label={`Assign sitter for ${appointment.pet}`}
            value={appointment.sitter ?? "Unassigned"}
            onChange={(event) => onChange?.(appointment, event.target.value)}
            onKeyDown={(event) => event.stopPropagation()}
        >
            <option value="Unassigned">Unassigned</option>
            {sitters.map((sitter) => (
                <option key={sitter} value={sitter}>{sitter === "You" ? "You (Angelena)" : sitter}</option>
            ))}
        </select>
    );
}

function AppointmentPriceField({ appointment, onPriceChange }) {
    const initialPrice = appointment.price ?? Number(appointment.deposit || 0) + Number(appointment.balance || 0);
    const [draft, setDraft] = useState(String(initialPrice));

    useEffect(() => setDraft(String(initialPrice)), [initialPrice]);

    return (
        <label className="ap-price-input">
            <span aria-hidden="true">$</span>
            <input
                type="text"
                inputMode="decimal"
                aria-label={`${appointment.service} appointment price`}
                value={draft}
                onChange={(event) => setDraft(cleanPrice(event.target.value))}
                onBlur={() => {
                    const price = draft === "" ? 0 : Number(draft);
                    onPriceChange?.(appointment, price);
                    setDraft(String(price));
                }}
            />
        </label>
    );
}

function InfoRow({ label, children }) {
    return (
        <div className="ap-info-row">
            <span className="ap-info-label">{label}</span>
            <span className="ap-info-value">{children}</span>
        </div>
    );
}

/**
 * Renders the Appointment Details popup (owner view, with payment info).
 * @param {Object} appointment The appointment to show.
 * @param {Array<string>} sitters Sitter names for the Sitter dropdown.
 * @param {Function} onClose Closes the popup.
 * @param {Function} onChange Called with the updated appointment when the sitter or a task changes.
 * @param {Object} handlers Accept, decline, complete, reschedule and cancel callbacks.
 * @returns {JSX.Element} The popup.
 */
export function AppointmentDetails({ appointment: a, sitters, onClose, onChange, handlers }) {
    const fullDate = new Date(`${a.date}T00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const subtitleDay = formatDay(a.date) === "Today" ? `Today, ${formatDay(a.date, false)}` : fullDate;
    const editable = !["completed", "cancelled"].includes(a.status);
    const canAssignSitter = a.status === "request";

    function changeSitter(value) {
        if (!canAssignSitter) return;
        const sitter = value === "Unassigned" ? null : value;
        const result = assignSitter(a.id, sitter);
        if (result.ok) onChange({ ...a, sitter });
    }

    function toggleTask(index) {
        onChange({ ...a, tasks: a.tasks.map((t, i) => (i === index ? { ...t, done: !t.done } : t)) });
    }

    return (
        <PopupFrame wide label={`${a.pet} appointment details`} onClose={onClose}>
            <div className="ap-popup-head">
                <span className="ap-avatar ap-avatar-lg"><PawIcon /></span>
                <div>
                    <h2 className="ap-popup-title">{a.pet} · {a.breed}</h2>
                    <p className="ap-popup-subtitle">{a.service} · {subtitleDay} · {formatTime(a.time)} ({a.length})</p>
                    <StatusPill status={a.status} />
                </div>
            </div>

            <div className="ap-details-grid">
                <div className="ap-details-col">
                    <section className="ap-card">
                        <h3 className="ap-card-title">Visit</h3>
                        <InfoRow label="Service">{a.service}</InfoRow>
                        <InfoRow label="Date & time">{fullDate} · {formatTime(a.time)}</InfoRow>
                        <InfoRow label="Length">{a.length}</InfoRow>
                        <label className="ap-field">
                            <span className="ap-field-label">Sitter</span>
            <select className="ap-input" value={a.sitter ?? "Unassigned"} onChange={(e) => changeSitter(e.target.value)} disabled={!canAssignSitter}>
                                {sitters.map((s) => <option key={s} value={s}>{s === "You" ? "You (Angelena)" : s}</option>)}
                            </select>
                        </label>
                    </section>
                    <section className="ap-card">
                        <h3 className="ap-card-title">Customer</h3>
                        <InfoRow label="Name">{a.customer}</InfoRow>
                        <InfoRow label="Phone">{a.phone}</InfoRow>
                        <InfoRow label="Email">{a.email}</InfoRow>
                        <InfoRow label="Address">{a.address}</InfoRow>
                    </section>
                </div>

                <div className="ap-details-col">
                    <section className="ap-card">
                        <h3 className="ap-card-title">Pet care</h3>
                        {a.allergy && <span className="ap-alert">⚠ {a.allergy}</span>}
                        <div className="ap-care"><span className="ap-info-label">Medication</span>{a.medication}</div>
                        <div className="ap-care"><span className="ap-info-label">Diet</span>{a.diet}</div>
                        <div className="ap-care"><span className="ap-info-label">Care notes</span>{a.notes}</div>
                    </section>
                    <section className="ap-card">
                        <h3 className="ap-card-title">Home access &amp; tasks</h3>
                        <p className="ap-care">{a.access}</p>
                        {a.tasks.map((t, i) => (
                            <label key={t.label} className="ap-task">
                                <input type="checkbox" checked={t.done} onChange={() => toggleTask(i)} />
                                {t.label}
                            </label>
                        ))}
                    </section>
                    <section className="ap-card">
                        <h3 className="ap-card-title">Payment <span className="ap-owner-tag">Owner</span></h3>
                        <InfoRow label="Deposit">${a.deposit.toFixed(2)} {a.payment === "deposit_unpaid" ? "not paid" : "paid"}</InfoRow>
                        <InfoRow label="Balance due">${a.balance.toFixed(2)}</InfoRow>
                    </section>
                </div>
            </div>

            <div className="ap-popup-actions ap-popup-actions-split">
                {["confirmed", "in_progress"].includes(a.status)
                    ? <button type="button" className="ap-link ap-link-danger" onClick={() => handlers.onCancel(a)}>Cancel visit</button>
                    : <span />}
                <div className="ap-popup-actions">
                    {a.status === "request" && (
                        <>
                            <button type="button" className="ap-btn ap-btn-outline" onClick={() => handlers.onDecline(a)}>Decline</button>
                            <button type="button" className="ap-btn ap-btn-primary" onClick={() => handlers.onAccept(a)}>Accept</button>
                        </>
                    )}
                    {["confirmed", "in_progress"].includes(a.status) && (
                        <button type="button" className={`ap-btn ${a.status === "in_progress" ? "ap-btn-outline" : "ap-btn-primary"}`} onClick={() => handlers.onReschedule(a)}>Reschedule</button>
                    )}
                    {a.status === "in_progress" && (
                        <button type="button" className="ap-btn ap-btn-primary" onClick={() => handlers.onComplete(a)}>Mark complete</button>
                    )}
                    {!editable && <button type="button" className="ap-btn ap-btn-outline" onClick={onClose}>Close</button>}
                </div>
            </div>
        </PopupFrame>
    );
}
