import "../../../styles/customer-dashboard/view-appointment/AppointmentAction.css";

function AppointmentAction({ appointment, setCurrentView, setAppointmentId, onReschedule }) {
  function handleViewDetails() {
    setAppointmentId(`${appointment.id}`)
    setCurrentView("appointment-detail");
  }

  function handleReschedule() {
    onReschedule(appointment.id);
  }

  return (
    <div className="appointment-actions">
      <button
        className="appointment-action-btn"
        onClick={handleViewDetails}
      >
        View Details
      </button>

      <button
        className="appointment-action-btn"
        onClick={handleReschedule}
      >
        Reschedule
      </button>
    </div>
  );
}

export default AppointmentAction;
