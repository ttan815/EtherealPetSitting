// Renders the Password & security card on the Manage Personal Information section.
import { ShieldCheck, KeyRound } from "lucide-react";

/**
 * Shows when the password was last changed, its strength, and a button to change it.
 * @param {string} lastChanged When the password was last changed, e.g. "4 months ago".
 * @param {string} strength The password strength label, e.g. "Strong".
 * @param {Function} onChangePassword Called when "Change password" is clicked.
 * @returns {JSX.Element} The password and security card.
 */
export default function PasswordSecurity({ lastChanged, strength = "Strong", onChangePassword }) {
    return (
        <article className="pi-card">
            <div className="pi-card-header">
                <div className="pi-card-icon" aria-hidden="true">
                    <ShieldCheck size={18} strokeWidth={1.75} />
                </div>
                <div className="pi-card-heading">
                    <h2 className="pi-card-title">Password &amp; security</h2>
                    <p className="pi-card-subtitle">Update your password and protect your customer account</p>
                </div>
            </div>

            <div className="pi-password-status">
                <div className="pi-password-icon" aria-hidden="true">
                    <KeyRound size={16} strokeWidth={1.75} />
                </div>
                <div className="pi-password-text">
                    <p className="pi-password-title">Password last changed {lastChanged}</p>
                    <p className="pi-password-hint">Use at least 8 characters with a number and symbol.</p>
                </div>
                <span className="pi-badge pi-badge-center">{strength}</span>
            </div>

            <div className="pi-card-footer">
                <p className="pi-two-step-note">Two-step verification is available for extra security.</p>
                <button type="button" className="ph-primary-button" onClick={onChangePassword}>
                    Change password
                </button>
            </div>
        </article>
    );
}