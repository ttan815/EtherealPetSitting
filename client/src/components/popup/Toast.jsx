// Renders a short confirmation toast, e.g. "Review approved".
import { useEffect } from "react";
import checkIcon from "../../assets/owner-dashboard/toast-check.svg";
import closeIcon from "../../assets/owner-dashboard/toast-close.svg";
import "../../styles/popup/Toast.css";

// Figma toasts ("Toast — Changes Saved", "Toast — Exported", ...).
// Hides itself after `duration` ms, or when the × is clicked.
/**
 * Shows a dark toast with a check, a message and a close button at the bottom of the screen.
 * @param {Object} props - Toast content and controls.
 * @param {string} props.message - The text shown in the toast.
 * @param {Function} props.onClose - Called when the toast should hide; keep it stable (e.g. useCallback).
 * @param {number} [props.duration] - How long the toast stays visible, in milliseconds.
 * @returns {JSX.Element} The toast.
 */
export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon">
        <img src={checkIcon} alt="" />
      </span>
      {message}
      <button type="button" className="toast-close" aria-label="Dismiss" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
    </div>
  );
}
