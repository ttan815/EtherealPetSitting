
import AppointmentStatus from "./AppointmentStatus";
import AppointmentAction from "./AppointmentAction";
import "../styles/AppointmentRow.css";

function AppointmentRow({ appointment }) {
  return (
    <tr className="appointment-row">
      <td>
        <div className="appointment-pet">
          <strong>{appointment.petName}</strong>
          <span>
            {appointment.service} · {appointment.petType}
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
        <AppointmentAction appointment={appointment} />
      </td>
    </tr>
  );
}

export default AppointmentRow;
