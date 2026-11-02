// Renders the Change password popup on the Manage Personal Information section.
import { useEffect, useRef, useState } from "react";

const EMPTY_FORM = { oldPassword: "", newPassword: "", confirmPassword: "" };

/**
 * Checks the new password against the rules shown in the hint.
 * @param {object} form The current old, new, and confirm password values.
 * @returns {string} An error message, or an empty string when the form is valid.
 */
export function validatePasswordForm({ oldPassword, newPassword, confirmPassword }) {
    if (!oldPassword || !newPassword || !confirmPassword) return "Please fill in all three fields.";
    if (newPassword.length < 8) return "New password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
        return "New password needs a mix of letters, numbers, and symbols.";
    }
    if (newPassword === oldPassword) return "New password must be different from your current one.";
    if (newPassword !== confirmPassword) return "New passwords don't match.";
    return "";
}

/**
 * Popup with Old, New, and Confirm new password fields, a hint, and Cancel / Update password buttons.
 * @param {boolean} open Whether the popup is visible.
 * @param {Function} onCancel Called when the popup is closed without saving.
 * @param {Function} onUpdate Called with { oldPassword, newPassword } when the form is valid.
 * @returns {JSX.Element|null} The popup, or nothing when closed.
 */
export default function ChangePasswordModal({ open, onCancel, onUpdate }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState("");
    const firstInput = useRef(null);

    // Reset the form and focus the first field each time the popup opens.
    useEffect(() => {
        if (!open) return undefined;
        setForm(EMPTY_FORM);
        setError("");
        firstInput.current?.focus();

        function handleKey(e) {
            if (e.key === "Escape") onCancel();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, onCancel]);

    if (!open) return null;

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        const message = validatePasswordForm(form);
        if (message) {
            setError(message);
            return;
        }
        onUpdate({ oldPassword: form.oldPassword, newPassword: form.newPassword });
    }

    return (
        <div className="pi-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
            <form
                className="pi-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pi-modal-title"
                onSubmit={handleSubmit}
                noValidate
            >
                <h2 id="pi-modal-title" className="pi-modal-title">Change password</h2>
                <p className="pi-modal-subtitle">Enter your current password and choose a new one.</p>

                <label className="pi-modal-label" htmlFor="pi-old-password">Old password</label>
                <input
                    id="pi-old-password"
                    ref={firstInput}
                    className="pi-modal-input"
                    type="password"
                    name="oldPassword"
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    value={form.oldPassword}
                    onChange={handleChange}
                />

                <label className="pi-modal-label" htmlFor="pi-new-password">New password</label>
                <input
                    id="pi-new-password"
                    className="pi-modal-input"
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    value={form.newPassword}
                    onChange={handleChange}
                />

                <label className="pi-modal-label" htmlFor="pi-confirm-password">Confirm new password</label>
                <input
                    id="pi-confirm-password"
                    className="pi-modal-input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />

                {error ? (
                    <p className="pi-modal-error" role="alert">{error}</p>
                ) : (
                    <p className="pi-modal-hint">
                        Use at least 8 characters with a mix of letters, numbers, and symbols.
                    </p>
                )}

                <div className="pi-modal-actions">
                    <button type="button" className="pi-modal-cancel" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="pi-modal-submit">Update password</button>
                </div>
            </form>
        </div>
    );
}