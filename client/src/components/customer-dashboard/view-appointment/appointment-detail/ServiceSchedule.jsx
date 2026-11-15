// Renders the service schedule component.
import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import {
    APPOINTMENT_DATE_LOCALE,
    APPOINTMENT_LONG_DATE_FORMAT_OPTIONS,
} from "../../../../constants/appointments/appointment-copy";

/**
 * Renders the service and schedule summary for an appointment.
 * @param {Object} props - Appointment data.
 * @param {Object} props.appointment - Appointment details used in the schedule summary.
 * @returns {JSX.Element} The appointment's service-and-schedule section.
 */
function ServiceSchedule( {appointment} ) {
    const appointmentDate = new Date(`${appointment.scheduledDate}T00:00:00`);

    return (
        <div className="card-service-schedule">
            <div className="service-schedule">Service &amp; Schedule</div>
            <div className="schedule-detail-meta">
            <div className="row-data-meta">
                <div className="sitter-assigned">Sitter Assigned</div>
                <div className="angelena-script-owner">{appointment.sitterName} ({appointment.sitterRole})</div>
            </div>
            <div className="row-data-meta">
                <div className="service-booked">Service Booked</div>
                <div className="drop-in-care">{appointment.service}</div>
            </div>
            <div className="row-data-meta">
                <div className="pet-name">Pet Name</div>
                <div className="mochi-shiba-inu">{appointment.petName} · {appointment.petBreed}</div>
            </div>
            <div className="row-data-meta">
                <div className="date-scheduled">Date Scheduled</div>
                <div className="tuesday-october-6-2026">
                    {appointmentDate.toLocaleDateString(APPOINTMENT_DATE_LOCALE, APPOINTMENT_LONG_DATE_FORMAT_OPTIONS)}
                </div>
            </div>
            <div className="row-data-meta">
                <div className="check-in-slot">Check-In Slot</div>
                <div className="time">{appointment.startTime}</div>
            </div>
            </div>
        </div>
    );
}

export default ServiceSchedule