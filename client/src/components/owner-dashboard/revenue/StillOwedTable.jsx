
import { useState } from "react";
import { TEMP_UNPAID_VISITS } from "../../../constants/owner/revenue";
import {
  formatRevenue,
  markAsPaid,
  sendReminder
} from "../../../services/owner-dashboard/revenue-service";

/**
 * Still owed table component.
 * @param {Object} props Component properties
 * @param {Array} props.visits Optional unpaid appointment records
 * @returns {JSX.Element} Still owed table
 */
export default function StillOwedTable({ visits }) {
  const [localUnpaidVisits, setLocalUnpaidVisits] = useState(TEMP_UNPAID_VISITS);
  const unpaidVisits = visits ?? localUnpaidVisits;

  const [remindingId, setRemindingId] = useState(null);
  const [paidLoadingId, setPaidLoadingId] = useState(null);
  const [message, setMessage] = useState("");

  /**
   * Handles marking an appointment as paid.
   * @param {number} appointmentId Appointment identifier
   * @returns {Promise<void>} Completion of the update
   */
  async function handleMarkPaid(appointmentId) {
    setPaidLoadingId(appointmentId);
    setMessage("");

    try {
      const success = await markAsPaid(appointmentId);

      if (success) {
        setLocalUnpaidVisits((previous) =>
          previous.filter((visit) => visit.id !== appointmentId)
        );

        setMessage("Payment successfully marked as paid.");
      }
    } catch {
      setMessage("Unable to update payment status.");
    } finally {
      setPaidLoadingId(null);
    }
  }

  /**
   * Handles sending a payment reminder.
   * @param {number} appointmentId Appointment identifier
   * @returns {Promise<void>} Completion of the reminder request
   */
  async function handleReminder(appointmentId) {
    setRemindingId(appointmentId);
    setMessage("");

    try {
      const success = await sendReminder(appointmentId);

      setMessage(
        success
          ? "Payment reminder sent."
          : "Unable to send payment reminder."
      );
    } catch {
      setMessage("Unable to send payment reminder.");
    } finally {
      setRemindingId(null);
    }
  }

  return (
    <section className="revenue-card revenue-owed-card">

      <div className="revenue-section-heading">
        <div>
          <h2>Still owed</h2>
          <p>Visits where the balance hasn't been paid yet</p>
        </div>
      </div>

      {message && (
        <div className="revenue-table-message" role="status">
          {message}
        </div>
      )}

      <div className="revenue-table-wrapper">

        <table className="revenue-owed-table">

          <thead>
            <tr>
              <th>CUSTOMER &amp; PET</th>
              <th>SERVICE</th>
              <th>VISIT DATE</th>
              <th>AMOUNT</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>

          <tbody>

            {unpaidVisits.length === 0 ? (
              <tr>
                <td colSpan="5" className="revenue-empty-table">
                  No outstanding payments.
                </td>
              </tr>
            ) : (
              unpaidVisits.map((visit) => (
                <tr key={visit.id}>

                  <td>
                    <div className="revenue-customer-cell">

                      <div className="revenue-customer-avatar">
                        {visit.initials}
                      </div>

                      <div className="revenue-customer-info">
                        <strong>{visit.customer}</strong>
                        <span>{visit.pet}</span>
                      </div>

                    </div>
                  </td>

                  <td>{visit.service}</td>

                  <td>{visit.date}</td>

                  <td className="revenue-owed-amount">
                    {formatRevenue(visit.amount)}
                  </td>

                  <td>
                    <div className="revenue-table-actions">

                      <button
                        type="button"
                        className="revenue-reminder-button"
                        disabled={
                          remindingId === visit.id ||
                          paidLoadingId === visit.id
                        }
                        onClick={() => handleReminder(visit.id)}
                      >
                        {remindingId === visit.id
                          ? "Sending..."
                          : "Send reminder"}
                      </button>

                      <button
                        type="button"
                        className="revenue-paid-button"
                        disabled={
                          paidLoadingId === visit.id ||
                          remindingId === visit.id
                        }
                        onClick={() => handleMarkPaid(visit.id)}
                      >
                        {paidLoadingId === visit.id
                          ? "Updating..."
                          : "✓ Mark as paid"}
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}