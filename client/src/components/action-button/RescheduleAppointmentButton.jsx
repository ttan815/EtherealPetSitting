// Renders the reschedule appointment button component.
import "../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

/**
 * Renders the action that starts rescheduling an appointment.
 * @param {Object} props - The rescheduling callback.
 * @param {Function} props.onReschedule - Called when the button is activated.
 * @returns {JSX.Element} The reschedule button.
 */
function RescheduleAppointButton({ onReschedule }) {
    return (
        <button
            type="button"
            className="button-reschedule-appointment"
            onClick={onReschedule}
        >
            Reschedule Appointment
        </button>
    );
}

export default RescheduleAppointButton;