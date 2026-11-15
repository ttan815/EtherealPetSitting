// Renders the past visit button component.
import { useState, useEffect } from "react";
import { getPastAppointments } from "../../../services/appointment-service";

/**
 * Renders the control that loads and selects past appointment history.
 * @param {Object} props - Appointment loading callback and dashboard filter state.
 * @param {Function} props.onAppointmentsLoaded - Receives appointments after they load.
 * @param {string} props.activeFilter - The currently selected appointment filter.
 * @param {Function} props.setActiveFilter - Changes the selected appointment filter.
 * @returns {JSX.Element} The past-appointments button.
 */
function PastVisitButton({ onAppointmentsLoaded, activeFilter, setActiveFilter }) {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    function loadAppointment() {
        const appointments = getPastAppointments();
        onAppointmentsLoaded(appointments);
        setLoaded(true);
        setLoading(false);
    }

    function handleClick() {
        setActiveFilter("past")
        setLoading(true);
        loadAppointment();
    }

    // Upon Rendered, Automatically Loaded Table with Upcoming Appointment
    useEffect(() => { loadAppointment() }, [])

    return (
        <button className={activeFilter === "past" ? "tab-pill-active" : "tab-pill"}
            onClick={handleClick}
            disabled={loading}
        >
            <div className={activeFilter === "past" ? "upcoming-visits" : "upcoming-visits-inactive"}>
                Past History
            </div>

            <div className={activeFilter === "upcoming" ? "counter-badge-inactive" : "counter-badge"}>
                <div className={activeFilter === "upcoming" ? "number-inactive" : "number"}>
                    {loaded ? getPastAppointments().length : 3}
                </div>
            </div>

        </button>
    );
}

export default PastVisitButton