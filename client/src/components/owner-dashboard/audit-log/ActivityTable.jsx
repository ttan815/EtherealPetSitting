// Renders audit log rows grouped by day using data supplied by the page.
import {
    AUDIT_LOG_DAY_FORMAT_OPTIONS,
    AUDIT_LOG_DETAILS_FORMAT_OPTIONS,
    AUDIT_LOG_LOCALE,
    AUDIT_LOG_TIME_FORMAT_OPTIONS,
    AUDIT_LOG_TODAY_LABEL,
    AUDIT_LOG_UNKNOWN_PERSON,
    AUDIT_LOG_YESTERDAY_LABEL,
} from "../../../constants/owner/audit-log";
import "../../../styles/owner-dashboard/audit-log/AuditLog.css";

/**
 * Turns a date into the day heading, like "Today", "Yesterday", or "Sat, Sep 26".
 * @param {Date} date The entry date.
 * @returns {string} The day label.
 */
function getDayLabel(date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return AUDIT_LOG_TODAY_LABEL;
    if (date.toDateString() === yesterday.toDateString()) return AUDIT_LOG_YESTERDAY_LABEL;
    return date.toLocaleDateString(AUDIT_LOG_LOCALE, AUDIT_LOG_DAY_FORMAT_OPTIONS);
}

/**
 * Groups entries by day while keeping newest first.
 * @param {Array} entries Log entries sorted newest first.
 * @returns {Array} Groups shaped like { label, entries }.
 */
function groupByDay(entries) {
    const groups = [];
    entries.forEach((entry) => {
        const label = getDayLabel(new Date(entry.time));
        const last = groups[groups.length - 1];
        if (last && last.label === label) last.entries.push(entry);
        else groups.push({ label, entries: [entry] });
    });
    return groups;
}

/**
 * Renders the audit log rows grouped under day headings.
 * @param {Object} props - Entries, person metadata, selected details, and row actions.
 * @param {Array<Object>} props.entries - Log entries sorted newest first.
 * @param {Object} props.people - Person metadata keyed by person ID.
 * @param {string|number|null} props.openId - ID of the row with details open.
 * @param {Object|null} props.details - Details for the open row.
 * @param {(id: string|number) => void} props.onToggleRow - Toggles row details.
 * @returns {JSX.Element} The activity table.
 */
export default function ActivityTable({ entries, people, openId, details, onToggleRow }) {
    return (
        <div className="al-table">
            {groupByDay(entries).map((group) => (
                <section key={group.label} className="al-day" aria-label={group.label}>
                    <h2 className="al-day-label">{group.label}</h2>
                    <ul className="al-rows">
                        {group.entries.map((entry) => {
                            const person = people[entry.person] ?? AUDIT_LOG_UNKNOWN_PERSON;
                            const isOpen = openId === entry.id;
                            return (
                                <li key={entry.id}>
                                    <button
                                        type="button"
                                        className="al-row"
                                        aria-expanded={isOpen}
                                        onClick={() => onToggleRow(entry.id)}
                                    >
                                        <span className="al-time">
                                            {new Date(entry.time).toLocaleTimeString(AUDIT_LOG_LOCALE, AUDIT_LOG_TIME_FORMAT_OPTIONS)}
                                        </span>
                                        <span className={`al-avatar${person.owner ? " al-avatar-owner" : ""}`} aria-hidden="true">
                                            {person.initials}
                                        </span>
                                        <span className="al-message">
                                            {entry.parts.map((part, i) =>
                                                part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>
                                            )}
                                        </span>
                                        <span className="al-area">{entry.area}</span>
                                    </button>
                                    {isOpen && details && (
                                        <p className="al-details">
                                            {new Date(entry.time).toLocaleString(AUDIT_LOG_LOCALE, AUDIT_LOG_DETAILS_FORMAT_OPTIONS)}
                                            {" · "}{details.changedBy}{" · "}{details.device}
                                        </p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ))}
        </div>
    );
}
