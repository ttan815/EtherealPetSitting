// Renders the appointment status component.
import "../../../styles/customer-dashboard/view-appointment/AppointmentStatus.css";

/**
 * Renders a visual status label for an appointment.
 * @param {Object} props - Appointment status value.
 * @param {string} props.status - The appointment status to display.
 * @returns {JSX.Element} The styled status label.
 */
function AppointmentStatus({ status }) {
  const className = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`status-badge status-${className}`}>
      {status}
    </span>
  );
}

export default AppointmentStatus;
