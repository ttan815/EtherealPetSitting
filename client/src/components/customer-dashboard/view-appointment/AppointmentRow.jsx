// Renders the appointment row component.
import AppointmentStatus from "./AppointmentStatus";
import AppointmentAction from "./AppointmentAction";
import "../../../styles/customer-dashboard/view-appointment/AppointmentRow.css";

/**
 * Renders a table row summarizing an appointment and its available actions.
 * @param {Object} props - Appointment details and dashboard action callbacks.
 * @param {string} props.activeFilter - The currently selected appointment filter.
 * @param {Object} props.appointment - Appointment data displayed in the row.
 * @param {Function} props.setCurrentView - Sets the dashboard view to display.
 * @param {Function} props.setAppointmentId - Sets the appointment ID in the dashboard.
 * @param {Function} props.onReschedule - Starts rescheduling the appointment.
 * @returns {JSX.Element} The appointment table row.
 */
function AppointmentRow({ activeFilter, appointment, setCurrentView, setAppointmentId, onReschedule }) {
  return (
    <tr className="appointment-row">
      <td>
        <div className="appointment-pet">
          <strong>{appointment.service}</strong>
          <span>
            {appointment.petName} ({appointment.petType})
          </span>
        </div>
      </td>

      <td>
        <div className="appointment-date">
          <strong>{appointment.date}</strong>
          <span>{appointment.time}</span>
        </div>
      </td>

      <td>
        <AppointmentStatus status={appointment.status} />
      </td>

      <td>
        <AppointmentStatus status={appointment.paymentStatus} />
      </td>

      <td>{appointment.balance}</td>

      <td>
        <AppointmentAction
          activeFilter={activeFilter}
          appointment={appointment}
          setCurrentView={setCurrentView}
          setAppointmentId={setAppointmentId}
          onReschedule={onReschedule}
        />
      </td>
    </tr>
  );
}

export default AppointmentRow;
