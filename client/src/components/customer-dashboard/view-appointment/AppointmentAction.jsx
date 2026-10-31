// Renders the appointment action component.
import "../../../styles/customer-dashboard/view-appointment/AppointmentAction.css";

/**
 * Renders context-sensitive appointment actions for a dashboard appointment.
 * @param {Object} props - Appointment details and dashboard action callbacks.
 * @param {string} props.activeFilter - The currently selected appointment filter.
 * @param {Object} props.appointment - The appointment associated with the actions.
 * @param {Function} props.setCurrentView - Sets the dashboard view to display.
 * @param {Function} props.setAppointmentId - Sets the appointment ID in the dashboard.
 * @param {Function} props.onReschedule - Starts rescheduling the appointment.
 * @returns {JSX.Element} The available appointment actions.
 */
function AppointmentAction({ activeFilter, appointment, setCurrentView, setAppointmentId, onReschedule }) {
  function handleViewDetails() {
    setAppointmentId(`${appointment.id}`);
    setCurrentView("appointment-detail");
  }

  function handleReschedule() {
    setAppointmentId(`${appointment.id}`);
    onReschedule(appointment.id);
  }

  return (
    activeFilter === "upcoming" ? (
      <div className="appointment-actions">
        <button
          type="button"
          className="appointment-action-btn"
          onClick={handleViewDetails}
        >
          View Details
        </button>

        <button
          type="button"
          className="appointment-action-btn"
          onClick={handleReschedule}
        >
          Reschedule
        </button>
      </div>
    ) :
      (
        <div className="appointment-actions">
          <button
            type="button"
            className="appointment-action-btn"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      )

  );
}

export default AppointmentAction;
