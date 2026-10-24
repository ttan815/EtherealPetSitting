import "../styles/AppointmentStatus.css";

function AppointmentStatus({ status }) {
  const className = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`status-badge status-${className}`}>
      {status}
    </span>
  );
}

export default AppointmentStatus;
