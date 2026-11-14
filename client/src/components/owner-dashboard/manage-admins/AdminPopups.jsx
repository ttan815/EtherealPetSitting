// popups for inviting, editing, and removing an admin
import { useEffect, useState } from "react";
import { Check, Mail, Pencil, X } from "lucide-react";
import "../../../styles/owner-dashboard/manage-admins/ManageAdmins.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ADMIN_CAN_DO = [
    "See the calendar, appointments, and customer & pet info",
    "Accept or decline booking requests",
    "Mark visits complete and approve reviews",
];

/**
 * Closes a popup when the esc key is pressed.
 * @param {boolean} open True while the popup is showing.
 * @param {Function} onClose Called when esc is pressed.
 * @returns {void}
 */
function useEscToClose(open, onClose) {
    useEffect(() => {
        if (!open) return undefined;
        function handleKey(e) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, onClose]);
}

/**
 * Renders the invite or edit admin popup.
 * @param {boolean} open True to show the popup.
 * @param {string} mode Either "invite" or "edit".
 * @param {Object} member The admin being edited, only used in edit mode.
 * @param {Function} onClose Called when cancel, the x, or esc is used.
 * @param {Function} onSubmit Called with { name, email, phone } when the form is valid.
 * @returns {JSX.Element|null} The popup, or nothing when closed.
 */
export function AdminFormPopup({ open, mode = "invite", member, onClose, onSubmit }) {
    const isEdit = mode === "edit";
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [errors, setErrors] = useState({});

    // fill the form each time the popup opens
    useEffect(() => {
        if (!open) return;
        setForm({
            name: isEdit ? member?.name ?? "" : "",
            email: isEdit ? member?.email ?? "" : "",
            phone: isEdit ? member?.phone ?? "" : "",
        });
        setErrors({});
    }, [open, isEdit, member]);

    useEscToClose(open, onClose);

    if (!open) return null;

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const nextErrors = {};
        if (!form.name.trim()) nextErrors.name = "Please enter their full name.";
        if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = "Please enter a valid email.";
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        onSubmit({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
    }

    // TODO: reusable modal component not available
    return (
        <div className="ma-overlay" onMouseDown={onClose}>
            <form
                className="ma-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="ma-form-title"
                onMouseDown={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="ma-modal-header">
                    <span className="ma-modal-icon" aria-hidden="true">
                        {isEdit ? <Pencil size={20} strokeWidth={1.75} /> : <Mail size={20} strokeWidth={1.75} />}
                    </span>
                    <div>
                        <h2 id="ma-form-title" className="ma-modal-title">
                            {isEdit ? "Edit Admin" : "Invite an Admin"}
                        </h2>
                        <p className="ma-modal-subtitle">
                            {isEdit ? "Update their name and contact details." : "They’ll get an email to set up their account."}
                        </p>
                    </div>
                    <button type="button" className="ma-close" aria-label="Close" onClick={onClose}>
                        <X size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* TODO: reusable text field component does not match this popup style */}
                <label className="ma-field-label" htmlFor="ma-name">Full name</label>
                <input
                    id="ma-name"
                    className="ma-input"
                    placeholder="e.g. Jamie Lee"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                />
                {errors.name && <p className="ma-error">{errors.name}</p>}

                <label className="ma-field-label" htmlFor="ma-email">Email</label>
                <div className="ma-input-icon">
                    <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                    <input
                        id="ma-email"
                        type="email"
                        className="ma-input"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        disabled={isEdit}
                    />
                </div>
                {errors.email && <p className="ma-error">{errors.email}</p>}

                <label className="ma-field-label" htmlFor="ma-phone">
                    Phone <span className="ma-optional">Optional</span>
                </label>
                <input
                    id="ma-phone"
                    type="tel"
                    className="ma-input"
                    placeholder="(555) 555-5555"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                />

                <div className="ma-can-do">
                    <p className="ma-can-do-title">What admins can do</p>
                    <ul>
                        {ADMIN_CAN_DO.map((item) => (
                            <li key={item}>
                                <span className="ma-check-box" aria-hidden="true">
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="ma-can-do-note">They can’t see revenue, availability, settings, or the audit log.</p>
                </div>

                <div className="ma-modal-actions">
                    <button type="button" className="ma-outline-button ma-big" onClick={onClose}>Cancel</button>
                    <button type="submit" className="ma-primary-button">{isEdit ? "Save changes" : "Send invite"}</button>
                </div>
            </form>
        </div>
    );
}

/**
 * Renders the remove admin confirmation popup.
 * @param {boolean} open True to show the popup.
 * @param {Object} member The admin being removed.
 * @param {Function} onClose Called when cancel or esc is used.
 * @param {Function} onConfirm Called when remove admin is clicked.
 * @returns {JSX.Element|null} The popup, or nothing when closed.
 */
export function RemoveAdminPopup({ open, member, onClose, onConfirm }) {
    useEscToClose(open, onClose);

    if (!open || !member) return null;

    const visits = member.visitsThisWeek ?? 0;

    // TODO: reusable modal component not available
    return (
        <div className="ma-overlay" onMouseDown={onClose}>
            <div
                className="ma-modal ma-modal-small"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="ma-remove-title"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <h2 id="ma-remove-title" className="ma-modal-title">Remove {member.name} as an admin?</h2>
                <p className="ma-modal-subtitle">
                    They’ll lose access right away.
                    {visits > 0 && ` Their ${visits} upcoming visits will need a new sitter.`}
                </p>
                <div className="ma-modal-actions">
                    <button type="button" className="ma-outline-button ma-big" onClick={onClose}>Cancel</button>
                    <button type="button" className="ma-danger-button" onClick={onConfirm}>Remove admin</button>
                </div>
            </div>
        </div>
    );
}
