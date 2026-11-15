// Renders the editable Personal details card on the Manage Personal Information section.
import { useEffect, useRef } from "react";
import { Pencil, Lock, SquareUser } from "lucide-react";
import { PERSONAL_DETAILS_FIELDS } from "../../../constants/customer/personal-info";

/**
 * Renders the personal details form; each field is read-only until its pencil (or "Edit all fields") is clicked.
 * @param {object} values The current field values, keyed by field name.
 * @param {boolean} verified Shows the "Verified" badge when true.
 * @param {string[]} editingFields Names of the fields that are currently editable.
 * @param {Function} onChange Called with (name, value) when a field changes.
 * @param {Function} onEditField Called with a field name when its pencil is clicked.
 * @param {Function} onEditAll Called when "Edit all fields" is clicked.
 * @returns {JSX.Element} The personal details card.
 */
export default function PersonalDetailsForm({ values, verified, editingFields, onChange, onEditField, onEditAll }) {
    const inputRefs = useRef({});
    const lastEdited = useRef(null);

    // Focus a field right after its pencil is clicked.
    useEffect(() => {
        if (lastEdited.current) {
            inputRefs.current[lastEdited.current]?.focus();
            lastEdited.current = null;
        }
    }, [editingFields]);

    function handlePencil(name) {
        lastEdited.current = name;
        onEditField(name);
    }

    return (
        <article className="pi-card">
            <div className="pi-card-header">
                <div className="pi-card-icon" aria-hidden="true">
                    <SquareUser size={18} strokeWidth={1.75} />
                </div>
                <div className="pi-card-heading">
                    <h2 className="pi-card-title">Personal details</h2>
                    <p className="pi-card-subtitle">How we address and contact you</p>
                </div>
                {verified && <span className="pi-badge">Verified</span>}
            </div>

            <div className="pi-fields">
                {PERSONAL_DETAILS_FIELDS.map(({ name, label, icon: Icon, type }) => {
                    const isEditing = editingFields.includes(name);
                    return (
                        <div className="pi-field" key={name}>
                            <label className="pi-field-label" htmlFor={`pi-${name}`}>
                                {label}
                            </label>
                            <div className={`pi-input-wrap${isEditing ? " editing" : ""}`}>
                                <Icon className="pi-input-icon" size={16} strokeWidth={1.75} aria-hidden="true" />
                                <input
                                    id={`pi-${name}`}
                                    ref={(el) => (inputRefs.current[name] = el)}
                                    className="pi-input"
                                    type={type}
                                    value={values[name] ?? ""}
                                    readOnly={!isEditing}
                                    onChange={(e) => onChange(name, e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="pi-pencil"
                                    onClick={() => handlePencil(name)}
                                    aria-label={`Edit ${label}`}
                                >
                                    <Pencil size={14} strokeWidth={1.75} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="pi-card-footer">
                <p className="pi-lock-note">
                    <Lock size={13} strokeWidth={1.75} aria-hidden="true" />
                    Contact details are shared only with your assigned caregiver.
                </p>
                <button type="button" className="pi-edit-all" onClick={onEditAll}>
                    <Pencil size={13} strokeWidth={1.75} aria-hidden="true" />
                    Edit all fields
                </button>
            </div>
        </article>
    );
}

/**
 * List of every editable field name, used by "Edit all fields".
 */