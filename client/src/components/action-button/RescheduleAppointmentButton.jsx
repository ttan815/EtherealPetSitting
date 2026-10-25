import "../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

function RescheduleAppointButton({ onClick }) {
    return (
        <button
            type="button"
            className="button-reschedule-appointment"
            onClick={onClick}
        >
            Reschedule Appointment
        </button>
    );
}

export default RescheduleAppointButton;