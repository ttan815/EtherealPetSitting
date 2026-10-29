import "../../../styles/customer-dashboard/view-appointment/AppointmentAction.css";

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
