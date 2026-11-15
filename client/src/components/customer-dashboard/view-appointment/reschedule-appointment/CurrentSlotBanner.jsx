// Renders the current slot banner component.
import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";
import {
  APPOINTMENT_DATE_LOCALE,
  APPOINTMENT_LONG_DATE_FORMAT_OPTIONS,
} from "../../../../constants/appointments/appointment-copy";

/**
 * Renders the banner describing the appointment's current time slot.
 * @param {Object} props Current appointment details.
 * @param {Object} props.appointment Appointment currently being rescheduled.
 * @returns {JSX.Element} The current appointment slot banner.
 */
function CurrentSlotBanner({ appointment }) {
  const appointmentDate = new Date(`${appointment.scheduledDate}T00:00:00`);
  const reschedulingFee = appointment.reschedulingFee
    ? `A $${appointment.reschedulingFee} fee applies to rescheduling.`
    : "No fee for rescheduling.";

  return (
    <div className="current-slot-banner">
      <div className="warning-symbol-holder" aria-hidden="true">!</div>
      <div className="current-details-block">
        <div className="current-appointment-drop-in-care-with-mochi">
          Current Appointment: {appointment.service} with {appointment.petName}
        </div>
        <div className="scheduled-for-tuesday-october-6-2026-12-00-pm-no-fee-for-rescheduling">
          Scheduled for: {appointmentDate.toLocaleDateString(APPOINTMENT_DATE_LOCALE, APPOINTMENT_LONG_DATE_FORMAT_OPTIONS)} @ {appointment.startTime}. {reschedulingFee}
        </div>
      </div>
    </div>
  );
}

export default CurrentSlotBanner;
