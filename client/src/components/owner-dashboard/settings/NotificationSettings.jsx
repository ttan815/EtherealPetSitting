// notifications card, the owner picks which updates they get notified about
import { Bell } from "lucide-react";
import { Toggle } from "./ServicePrices";
import { NOTIFICATION_OPTIONS } from "../../../constants/notifications";
import "../../../styles/owner-dashboard/settings/Settings.css";

/**
 * Renders the notifications card with one toggle per notification type.
 * @param {Object} settings True or false for each notification key.
 * @param {Function} onChange Called with the updated settings object.
 * @returns {JSX.Element} The notifications card.
 */
export default function NotificationSettings({ settings, onChange }) {
    return (
        <section className="st-card" aria-labelledby="st-notifications-title">
            <div className="st-card-header">
                <span className="st-card-icon" aria-hidden="true"><Bell size={18} strokeWidth={1.75} /></span>
                <div>
                    <h2 id="st-notifications-title" className="st-card-title">Notifications</h2>
                    <p className="st-card-subtitle">Choose what you get notified about</p>
                </div>
            </div>

            <ul className="st-rows">
                {NOTIFICATION_OPTIONS.map((option) => (
                    <li key={option.key} className="st-row">
                        <span className="st-row-label">{option.label}</span>
                        <Toggle
                            checked={Boolean(settings[option.key])}
                            label={option.label}
                            onChange={(value) => onChange({ ...settings, [option.key]: value })}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
