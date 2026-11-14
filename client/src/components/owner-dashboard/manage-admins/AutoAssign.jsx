// when you're away card, lets the owner pick a backup admin and turn auto redirect on or off
import { Send } from "lucide-react";
import "../../../styles/owner-dashboard/manage-admins/ManageAdmins.css";

/**
 * Renders the auto assign card with a redirect toggle and a backup admin dropdown.
 * @param {Array} admins Active admins that can be picked as the backup ({ id, name }).
 * @param {boolean} enabled True when auto redirect is turned on.
 * @param {string} backupId The id of the chosen backup admin.
 * @param {Function} onChange Called with { enabled, backupId } whenever something changes.
 * @returns {JSX.Element} The when you're away card.
 */
export default function AutoAssign({ admins, enabled, backupId, onChange }) {
    const hasAdmins = admins.length > 0;

    return (
        <section className="ma-card" aria-labelledby="ma-away-title">
            <h2 id="ma-away-title" className="ma-card-title">When you’re away</h2>
            <p className="ma-card-subtitle">Send admin tasks and customer messages to a backup</p>

            {/* TODO: reusable toggle switch component not available */}
            <div className="ma-toggle-row">
                <button
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    aria-label="Automatically redirect to my backup when I’m unavailable"
                    className={`ma-switch${enabled ? " is-on" : ""}`}
                    onClick={() => onChange({ enabled: !enabled, backupId })}
                    disabled={!hasAdmins}
                >
                    <span className="ma-switch-knob" />
                </button>
                <span className="ma-toggle-label">Automatically redirect to my backup when I’m unavailable</span>
            </div>

            <label className="ma-field-label" htmlFor="ma-backup-select">Backup admin</label>
            {/* TODO: reusable select dropdown component not available */}
            <select
                id="ma-backup-select"
                className="ma-select"
                value={backupId}
                onChange={(e) => onChange({ enabled, backupId: e.target.value })}
                disabled={!hasAdmins}
            >
                {!hasAdmins && <option value="">Invite an admin first</option>}
                {admins.map((admin) => (
                    <option key={admin.id} value={admin.id}>{admin.name}</option>
                ))}
            </select>

            <p className="ma-hint">
                <Send size={14} strokeWidth={1.75} aria-hidden="true" />
                Turns on when you mark yourself as away.
            </p>
        </section>
    );
}
