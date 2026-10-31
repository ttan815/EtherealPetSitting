// Renders the reschedule header component.
import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

/**
 * Renders the rescheduling page heading and keep-appointment action.
 * @param {Object} props - Callback for leaving the rescheduling flow.
 * @param {Function} props.onKeepAppointment - Called to keep the current appointment.
 * @returns {JSX.Element} The rescheduling header.
 */
function RescheduleHeader({ onKeepAppointment }) {
  return (
    <header className="header">
      <div className="title">
        <h1 id="reschedule-title" className="reschedule-appointment">
          Reschedule Appointment
        </h1>
        <div className="pick-a-new-date-and-time-your-deposit-carries-over">
          Pick a new date and time. Your deposit carries over.
        </div>
      </div>
      <button
        type="button"
        className="close"
        onClick={onKeepAppointment}
        aria-label="Keep current appointment and close"
      >
        &times;
      </button>
    </header>
  );
}

export default RescheduleHeader;
