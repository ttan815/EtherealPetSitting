import AppointmentStatus from "./AppointmentStatus";
import AppointmentAction from "./AppointmentAction";
import "../../../styles/customer-dashboard/view-appointment/AppointmentRow.css";

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
