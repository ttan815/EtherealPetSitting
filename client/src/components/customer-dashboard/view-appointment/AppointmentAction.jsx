import "../../../styles/customer-dashboard/view-appointment/AppointmentAction.css";

function AppointmentAction({ appointment }) {
  function handleViewDetails() {
    console.log("View appointment:", appointment.id);
  }

  function handleReschedule() {
    console.log("Reschedule appointment:", appointment.id);
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
