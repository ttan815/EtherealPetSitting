
import AppointmentRow from "./AppointmentRow";
import "../styles/AppointmentTable.css";

const appointments = [
  {
    id: 1,
    petName: "Mochi",
    petType: "Dog",
    service: "Pet Sitting",
    date: "Oct 25, 2026",
    time: "9:00 AM - 12:00 PM",
    status: "Confirmed",
    paymentStatus: "Paid",
    balance: "$0.00",
  },
  {
    id: 2,
    petName: "Luna",
    petType: "Cat",
    service: "Drop-in Visit",
    date: "Oct 26, 2026",
    time: "2:00 PM - 3:00 PM",
    status: "Request",
    paymentStatus: "Pending",
    balance: "$25.00",
  },
];

function AppointmentsTable() {
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
