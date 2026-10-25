import "../../styles/popup/RescheduleAppointmentConfirmation.css";

function RescheduleConfirmation({ appointmentId, onViewAppointment }) {
  return (
    <div className="reschedule-confirmation-backdrop">
      <section
        className="popup-reschedule-confirmed"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reschedule-confirmation-title"
      >
        <div className="reschedule-confirmation-check" aria-hidden="true">
          ✓
        </div>
        <div className="modal-message-block">
          <h2 id="reschedule-confirmation-title" className="appointment-rescheduled">
            Appointment Rescheduled
          </h2>
          <p className="your-appointment-has-been-successfully-rescheduled-the-business-has-been-notified-of-your-updated-availability">
            Your appointment has been successfully rescheduled. The business has
            been notified of your updated availability.
          </p>
        </div>
        <button
          type="button"
          className="button-view-my-appointments"
          onClick={() => onViewAppointment(appointmentId)}
        >
          View Appointment
        </button>
      </section>
    </div>
  );
}

export default RescheduleConfirmation;
