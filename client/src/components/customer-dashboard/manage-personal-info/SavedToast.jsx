// Renders the "Changes saved" toast shown after saving personal information.
import { useEffect } from "react";
import { Check } from "lucide-react";

/**
 * Shows a toast message and hides it automatically after a delay.
 * @param {string} message The text shown in the toast.
 * @param {boolean} show Whether the toast is visible.
 * @param {Function} onClose Called when the toast should hide.
 * @param {number} duration How long the toast stays visible, in milliseconds.
 * @returns {JSX.Element|null} The toast, or nothing when hidden.
 */
export default function SavedToast({ message = "Changes saved", show, onClose, duration = 2500 }) {
    useEffect(() => {
        if (!show) return undefined;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [show, onClose, duration]);

    if (!show) return null;

    return (
        <div className="pi-toast" role="status" aria-live="polite">
            <span className="pi-toast-icon" aria-hidden="true">
                <Check size={14} strokeWidth={2} />
            </span>
            {message}
        </div>
    );
}