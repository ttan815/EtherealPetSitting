// business info card, the name and contact details shown on the website and in emails
import { Store } from "lucide-react";
import "../../../styles/owner-dashboard/settings/Settings.css";

/**
 * Renders one labeled text input for the business info card.
 * @param {string} id The input id.
 * @param {string} label The label text.
 * @param {string} value The current value.
 * @param {string} placeholder Hint text when empty.
 * @param {string} type The input type, like "text" or "email".
 * @param {string} error Error message to show under the input.
 * @param {Function} onChange Called with the new value.
 * @returns {JSX.Element} The field.
 */
function InfoField({ id, label, value, placeholder, type = "text", error, onChange }) {
    // TODO: reusable text field component does not match this card style
    return (
        <div className="st-field">
            <label className="st-label" htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                className={`st-input${error ? " has-error" : ""}`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={Boolean(error)}
            />
            {error && <p className="st-error">{error}</p>}
        </div>
    );
}

/**
 * Renders the business info card with name, email, phone, and social links.
 * @param {Object} info The { name, email, phone, instagram, facebook } values.
 * @param {Object} errors Error messages keyed by field name.
 * @param {Function} onChange Called with the updated info object.
 * @returns {JSX.Element} The business info card.
 */
export default function BusinessInfo({ info, errors, onChange }) {
    function update(field, value) {
        onChange({ ...info, [field]: value });
    }

    return (
        <section className="st-card" aria-labelledby="st-business-title">
            <div className="st-card-header">
                <span className="st-card-icon" aria-hidden="true"><Store size={18} strokeWidth={1.75} /></span>
                <div>
                    <h2 id="st-business-title" className="st-card-title">Business info</h2>
                    <p className="st-card-subtitle">Shown on the website and in customer emails</p>
                </div>
            </div>

            <InfoField id="st-name" label="Business name" value={info.name} error={errors.name} onChange={(v) => update("name", v)} />

            <div className="st-two-col">
                <InfoField id="st-email" type="email" label="Email" value={info.email} placeholder="name@example.com" error={errors.email} onChange={(v) => update("email", v)} />
                <InfoField id="st-phone" type="tel" label="Phone" value={info.phone} placeholder="(555) 555-5555" error={errors.phone} onChange={(v) => update("phone", v)} />
            </div>

            <InfoField id="st-instagram" type="url" label="Instagram link" value={info.instagram} placeholder="Paste your Instagram page link" error={errors.instagram} onChange={(v) => update("instagram", v)} />
            <InfoField id="st-facebook" type="url" label="Facebook link" value={info.facebook} placeholder="Paste your Facebook page link" error={errors.facebook} onChange={(v) => update("facebook", v)} />
        </section>
    );
}
