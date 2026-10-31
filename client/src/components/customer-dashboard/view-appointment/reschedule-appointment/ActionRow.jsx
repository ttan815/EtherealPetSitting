// Renders the action row component.
import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

/**
 * Renders the keep-appointment and confirm controls for rescheduling.
 * @param {Object} props - Rescheduling actions and confirmation state.
 * @param {Function} props.onKeepAppointment - Called to abandon rescheduling.
 * @param {Function} props.onConfirm - Called to confirm the selected new slot.
 * @param {boolean} props.canConfirm - Whether a reschedule selection is ready to confirm.
 * @returns {JSX.Element} The rescheduling action row.
 */
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
