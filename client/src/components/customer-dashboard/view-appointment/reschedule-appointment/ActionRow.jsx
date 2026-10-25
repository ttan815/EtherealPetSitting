import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

function ActionRow({ onKeepAppointment, onConfirm, canConfirm }) {
  return (
    <div className="action-row-reschedule">
      <button
        type="button"
        className="button-keep-current-appointment"
        onClick={onKeepAppointment}
      >
        Keep Current Appointment
      </button>
      <button
        type="button"
        className="button-confirm-reschedule"
        onClick={onConfirm}
        disabled={!canConfirm}
      >
        Confirm Reschedule
      </button>
    </div>
  );
}

export default ActionRow;
