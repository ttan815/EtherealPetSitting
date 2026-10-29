import AppointmentRow from "./AppointmentRow";
import "../../../styles/customer-dashboard/view-appointment/AppointmentTable.css";

/**
* Temp Database Structure:
* id: 1,
* petName: "Buddy",
* service: "Dog Walking",
* date: "Oct 26, 2026",
* time: "10:00 AM",
* status: "Confirmed",
* paymentStatus: "Paid",
* balance: "$0.00",
* petType: "dog"
*/
function AppointmentsTable({ activeFilter, appointments, setCurrentView, setAppointmentId, onReschedule }) {
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
              activeFilter={activeFilter}
              appointment={appointment}
              setCurrentView={setCurrentView}
              setAppointmentId={setAppointmentId}
              onReschedule={onReschedule}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsTable;
