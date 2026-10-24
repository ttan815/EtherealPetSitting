import AppointmentRow from "./AppointmentRow";
import "../styles/AppointmentTable.css";

function AppointmentsTable( {appointments}) {
  return (
    <div className="appointments-table-wrapper">
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Service & Pet</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Payment State</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => (
            <AppointmentRow
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsTable;
