import "../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

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