// Renders a confirm popup with a message box, shared by the owner dashboard's
// Decline Booking and Reject Review popups.
import { useEffect, useState } from "react";
import closeIcon from "../../assets/owner-dashboard/close-icon.svg";
import "../../styles/popup/ReasonPopup.css";

// Figma "Admin Pop-up — Decline Booking" / "Admin Pop-up — Reject Review".
// Closes with Cancel, the × button, Escape, or a click outside the popup.
/**
 * Asks the owner to confirm an action, with a message for the customer.
 * @param {Object} props - Popup content and controls.
 * @param {string} props.icon - Icon shown in the red badge.
 * @param {string} props.title - The question, e.g. "Reject this review?".
 * @param {string} props.description - What happens if the owner confirms.
 * @param {string} props.fieldLabel - Label of the message box.
 * @param {string} props.placeholder - Example message.
 * @param {boolean} [props.isRequired] - When true, the confirm button stays disabled until a message is typed;
 *   otherwise the box is labeled "Optional".
 * @param {string} props.confirmLabel - Text of the red confirm button.
 * @param {Function} props.onCancel - Called when the popup is closed without confirming.
 * @param {Function} props.onConfirm - Called with the trimmed message when the confirm button is clicked.
 * @returns {JSX.Element} The popup.
 */
export default function ReasonPopup({
  icon,
  title,
  description,
  fieldLabel,
  placeholder,
  isRequired = false,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  const [message, setMessage] = useState("");
  const canConfirm = !isRequired || message.trim() !== "";

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
    <div className="reason-popup-backdrop" onClick={onCancel}>
      <section
        className="reason-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reason-popup-title"
        aria-describedby="reason-popup-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="reason-popup-header">
          <span className="reason-popup-icon">
            <img src={icon} alt="" />
          </span>

          <div className="reason-popup-heading">
            <h2 id="reason-popup-title" className="reason-popup-title">
              {title}
            </h2>
            <p id="reason-popup-description" className="reason-popup-description">
              {description}
            </p>
          </div>

          <button type="button" className="reason-popup-close" aria-label="Close" onClick={onCancel}>
            <img src={closeIcon} alt="" />
          </button>
        </div>

        <div className="reason-popup-field">
          <label htmlFor="reason-popup-message" className="reason-popup-label">
            {fieldLabel}
            {!isRequired && <span className="reason-popup-optional">Optional</span>}
          </label>
          <textarea
            id="reason-popup-message"
            className="reason-popup-message"
            placeholder={placeholder}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required={isRequired}
            autoFocus
          />
        </div>

        <div className="reason-popup-actions">
          <button type="button" className="reason-popup-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="reason-popup-confirm"
            disabled={!canConfirm}
            onClick={() => onConfirm(message.trim())}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
