// Renders the upcoming visit button component.
import { useState, useEffect } from "react";
import { getUpcomingAppointments } from "../../../services/owner-dashboard/appointment-service";
import "../../../styles/customer-dashboard/view-appointment/UpcomingVisitButton.css";

/**
 * Renders the control that loads and selects upcoming appointments.
 * @param {Object} props - Appointment loading callback and dashboard filter state.
 * @param {Function} props.onAppointmentsLoaded - Receives appointments after they load.
 * @param {string} props.activeFilter - The currently selected appointment filter.
 * @param {Function} props.setActiveFilter - Changes the selected appointment filter.
 * @returns {JSX.Element} The upcoming-appointments button.
 */
function UpcomingVisitButton({ onAppointmentsLoaded, activeFilter, setActiveFilter }) {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    function loadAppointment() {
        const appointments = getUpcomingAppointments();
        onAppointmentsLoaded(appointments);
        setLoaded(true);
        setLoading(false);
    }

    function handleClick() {
        setActiveFilter("upcoming")
        setLoading(true);
        loadAppointment();
    }

    // Upon Rendered, Automatically Loaded Table with Upcoming Appointment
    useEffect(() => { loadAppointment() }, [])

    return (
        <button className={activeFilter === "upcoming" ? "tab-pill-active" : "tab-pill"}
            onClick={handleClick}
            disabled={loading}
        >
            <div className={activeFilter === "upcoming" ? "upcoming-visits" : "upcoming-visits-inactive"}>
                Upcoming Visits
            </div>

            <div className={activeFilter === "upcoming" ? "counter-badge" : "counter-badge-inactive"}>
                <div className={activeFilter === "upcoming" ? "number" : "number-inactive"}>
                    {loaded ? getUpcomingAppointments().length : 3}
                </div>
            </div>

        </button>
    );
}

export default UpcomingVisitButton;
