// Renders the appointment table component.
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
/**
 * Renders the appointments table for the selected dashboard filter.
 * @param {Object} props - Appointment records, filter, and action callbacks.
 * @param {string} props.activeFilter - The currently selected appointment filter.
 * @param {Array<Object>} props.appointments - Appointment records to display.
 * @param {Function} props.setCurrentView - Sets the dashboard view to display.
 * @param {Function} props.setAppointmentId - Sets the appointment ID in the dashboard.
 * @param {Function} props.onReschedule - Starts rescheduling an appointment.
 * @returns {JSX.Element} The filtered appointments table.
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
