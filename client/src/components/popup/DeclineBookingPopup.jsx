// Renders the decline booking popup on the owner dashboard.
import { useEffect, useState } from "react";
import declineIcon from "../../assets/owner-dashboard/decline-icon.svg";
import closeIcon from "../../assets/owner-dashboard/close-icon.svg";
import "../../styles/popup/DeclineBookingPopup.css";

// Figma "Admin Pop-up — Decline Booking".
// Closes with Cancel, the × button, Escape, or a click outside the popup.
/**
 * Asks the owner to confirm declining a booking request, with an optional message to the customer.
 * @param {Object} props - The request and popup controls.
 * @param {Object} props.request - The booking request being declined.
 * @param {Function} props.onCancel - Called when the popup is closed without declining.
 * @param {Function} props.onConfirm - Called with the message (may be empty) when "Decline request" is clicked.
 * @returns {JSX.Element} The decline booking popup.
 */
export default function DeclineBookingPopup({ request, onCancel, onConfirm }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onCancel]);

  return (
    <div className="decline-booking-backdrop" onClick={onCancel}>
      <section
        className="decline-booking-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="decline-booking-title"
        aria-describedby="decline-booking-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="decline-booking-header">
          <span className="decline-booking-icon">
            <img src={declineIcon} alt="" />
          </span>

          <div className="decline-booking-heading">
            <h2 id="decline-booking-title" className="decline-booking-title">
              Decline {request.petName}’s booking request?
            </h2>
            <p id="decline-booking-description" className="decline-booking-description">
              {request.customerName} will be notified
              {request.isDepositPaid ? `, and their $${request.depositAmount} deposit will be refunded.` : "."}
            </p>
          </div>

          <button type="button" className="decline-booking-close" aria-label="Close" onClick={onCancel}>
            <img src={closeIcon} alt="" />
          </button>
        </div>

        <div className="decline-booking-field">
          <label htmlFor="decline-booking-message" className="decline-booking-label">
            Message to the customer <span className="decline-booking-optional">Optional</span>
          </label>
          <textarea
            id="decline-booking-message"
            className="decline-booking-message"
            placeholder="e.g. Sorry, we’re fully booked that weekend."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            autoFocus
          />
        </div>

        <div className="decline-booking-actions">
          <button type="button" className="decline-booking-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="decline-booking-confirm" onClick={() => onConfirm(message.trim())}>
            Decline request
          </button>
        </div>
      </section>
    </div>
  );
}
