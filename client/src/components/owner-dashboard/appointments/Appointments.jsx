// Renders the owner's Appointments section inside /employee-dashboard (DT-299).
// Owners review new booking requests and track every visit in one filterable list.
import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../parent-component/PageHeader";
import AppointmentFilter from "./AppointmentFilter";
import AppointmentTable, { AppointmentDetails } from "./AppointmentTable";
import {
    acceptAppointment, cancelAppointment, declineAppointment, filterAppointments, getAppointmentCounts,
    getAppointments, getServices, getSitters, markAppointmentComplete, parseISODate, rescheduleAppointment,
    shiftDate,
} from "../../../services/owner-dashboard/appointment-service";
import { DEFAULT_FILTERS } from "../../../constants/appointments/appointment";
import { DeclineBookingPopup, RescheduleModal } from "./AppointmentRowActions";
import "../../../styles/owner-dashboard/appointments/Appointments.css";
import NewAppointmentButton from "../../action-button/NewAppointmentButton";

/**
 * Renders the Appointments section: header, status tabs, filters, table, popups and toast.
 * @param {Function} onRequestCountChange Optional; called with the number of booking requests so the sidebar badge stays in sync.
 * @returns {JSX.Element} The Appointments section.
 */
export default function Appointments({ onRequestCountChange }) {
    const [sitters] = useState(getSitters);
    const [services] = useState(getServices);
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [detailsId, setDetailsId] = useState(null);
    const [popup, setPopup] = useState(null); // { mode: "decline" | "reschedule", id }
    const [toast, setToast] = useState("");

    // Load appointments once on render
    useEffect(() => {
        setAppointments(getAppointments({ tab: "all" }));
    }, []);

    const counts = getAppointmentCounts(appointments);

    // Keep the sidebar "Appointments" badge in sync with the number of requests
    useEffect(() => {
        if (onRequestCountChange) onRequestCountChange(counts.requests);
    }, [counts.requests, onRequestCountChange]);

    // Hide the toast after a few seconds
    useEffect(() => {
        if (!toast) return undefined;
        const timer = setTimeout(() => setToast(""), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const closeDetails = useCallback(() => setDetailsId(null), []);
    const closePopup = useCallback(() => setPopup(null), []);

    function updateAppointment(id, changes) {
        setAppointments((list) => list.map((a) => (a.id === id ? { ...a, ...changes } : a)));
    }

    function finish(message) {
        setToast(message);
        setDetailsId(null);
        setPopup(null);
    }

    // Row and details actions
    const handlers = {
        onAccept(a) {
            if (!acceptAppointment(a.id).ok) return;
            updateAppointment(a.id, { status: "confirmed" });
            finish("Booking request accepted");
        },
        onDecline: (a) => { setDetailsId(null); setPopup({ mode: "decline", id: a.id }); },
        onComplete(a) {
            if (!markAppointmentComplete(a.id).ok) return;
            updateAppointment(a.id, { status: "completed" });
            finish("Visit marked complete");
        },
        onReschedule: (a) => { setDetailsId(null); setPopup({ mode: "reschedule", id: a.id }); },
        onView: (a) => setDetailsId(a.id),
        onCancel(a) {
            if (!cancelAppointment(a.id).ok) return;
            updateAppointment(a.id, { status: "cancelled" });
            finish("Visit cancelled");
        },
    };

    function handleDeclineConfirm(message) {
        if (!declineAppointment(popup.id, message).ok) return;
        updateAppointment(popup.id, { status: "cancelled" });
        finish("Booking request declined");
    }

    function handleRescheduleConfirm({ date, time }) {
        const a = appointments.find((item) => item.id === popup.id);
        if (!rescheduleAppointment(a.id, { date, time }).ok) return;
        updateAppointment(a.id, { date, time, endDate: a.endDate ? shiftDate(a.endDate, a.date, date) : undefined });
        finish("Appointment rescheduled");
    }

    const visible = filterAppointments(appointments, activeTab, filters);
    const detailsAppointment = appointments.find((a) => a.id === detailsId);
    const popupAppointment = appointments.find((a) => a.id === popup?.id);

    return (
        <section className="ap-page">
            {/* Header: reuses PageHeader (title, subtitle, bell, New Appointment) */}
            <PageHeader
                title="Appointments"
                subtitle="Review new requests and keep track of every visit."
                actionButton={<NewAppointmentButton />}
            />

            <AppointmentFilter
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={counts}
                filters={filters}
                onFiltersChange={setFilters}
                sitters={sitters}
                services={services}
            />

            <AppointmentTable appointments={visible} activeTab={activeTab} handlers={handlers} />

            {detailsAppointment && (
                <AppointmentDetails
                    appointment={detailsAppointment}
                    sitters={sitters}
                    onClose={closeDetails}
                    onChange={(updated) => updateAppointment(updated.id, updated)}
                    handlers={handlers}
                />
            )}

            {popup?.mode === "decline" && popupAppointment && (
                <DeclineBookingPopup appointment={popupAppointment} onClose={closePopup} onConfirm={handleDeclineConfirm} />
            )}
            {popup?.mode === "reschedule" && popupAppointment && (
                <RescheduleModal appointment={popupAppointment} onClose={closePopup} onConfirm={handleRescheduleConfirm} />
            )}

            {/* TODO: reusable <Toast> component not available */}
            {toast && (
                <div className="ap-toast" role="status">
                    <span className="ap-toast-check" aria-hidden="true">✓</span>
                    {toast}
                </div>
            )}
        </section>
    );
}
