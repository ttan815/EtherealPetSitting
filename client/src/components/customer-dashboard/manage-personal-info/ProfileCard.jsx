// Renders the profile summary card on the Manage Personal Information section.
import { Camera } from "lucide-react";

/**
 * Builds up to two initials from a full name.
 * @param {string} name The customer's full name.
 * @returns {string} The initials, e.g. "MR".
 */
export function getInitials(name = "") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
}

/**
 * Renders the customer's avatar, name, email, verified badge, and account summary.
 * @param {object} customer The logged-in customer's details.
 * @param {Function} onChangePhoto Called when "Change profile photo" is clicked.
 * @returns {JSX.Element} The profile card.
 */
export default function ProfileCard({ customer, onChangePhoto }) {
    const displayName = customer.preferredName
        ? `${customer.preferredName} ${customer.fullName.split(" ").slice(-1)[0]}`
        : customer.fullName;

    return (
        <article className="pi-profile-card">
            <div className="pi-profile-avatar" aria-hidden="true">
                {getInitials(customer.fullName)}
            </div>

            <h2 className="pi-profile-name">{displayName}</h2>
            <p className="pi-profile-email">{customer.email}</p>

            {customer.verified && <span className="pi-profile-badge">Account verified</span>}

            <button type="button" className="pi-profile-photo-button" onClick={onChangePhoto}>
                <Camera size={14} strokeWidth={1.75} aria-hidden="true" />
                Change profile photo
            </button>

            <dl className="pi-profile-summary">
                <div className="pi-profile-summary-row">
                    <dt>Member since</dt>
                    <dd>{customer.memberSince}</dd>
                </div>
                <div className="pi-profile-summary-row">
                    <dt>Home service area</dt>
                    <dd>{customer.serviceArea}</dd>
                </div>
                <div className="pi-profile-summary-row">
                    <dt>Primary pet</dt>
                    <dd>{customer.primaryPet}</dd>
                </div>
            </dl>
        </article>
    );
}