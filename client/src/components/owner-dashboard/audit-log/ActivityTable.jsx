// activity table for the audit log, rows are grouped by day
import { useState } from "react";
import "../../../styles/owner-dashboard/audit-log/AuditLog.css";

const PEOPLE = {
    you: { initials: "SA", owner: true },
    adrian: { initials: "AP", owner: false },
};

/**
 * Gets the full details for one log entry, shown when a row is opened.
 * @param {string} id The log entry id.
 * @returns {Object} The details { id, changedBy, device }.
 */
export function getNotification(id) {
    // TODO: replace with backend call
    const temp = { id, changedBy: "Signed in account", device: "Web browser" };
    return temp;
}

/**
 * Turns a date into the day heading, like "Today", "Yesterday", or "Sat, Sep 26".
 * @param {Date} date The entry date.
 * @returns {string} The day label.
 */
function getDayLabel(date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
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
 * @param {Array} entries Log entries ({ id, time, person, area, parts }) sorted newest first.
 * @returns {JSX.Element} The activity table.
 */
export default function ActivityTable({ entries }) {
    const [openId, setOpenId] = useState(null);
    const [details, setDetails] = useState(null);

    function toggleRow(id) {
        if (openId === id) {
            setOpenId(null);
            return;
        }
        setDetails(getNotification(id));
        setOpenId(id);
    }

    return (
        <div className="al-table">
            {groupByDay(entries).map((group) => (
                <section key={group.label} className="al-day" aria-label={group.label}>
                    <h2 className="al-day-label">{group.label}</h2>
                    <ul className="al-rows">
                        {group.entries.map((entry) => {
                            const person = PEOPLE[entry.person] ?? { initials: "?", owner: false };
                            const isOpen = openId === entry.id;
                            return (
                                <li key={entry.id}>
                                    <button
                                        type="button"
                                        className="al-row"
                                        aria-expanded={isOpen}
                                        onClick={() => toggleRow(entry.id)}
                                    >
                                        <span className="al-time">
                                            {new Date(entry.time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
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
                                            {new Date(entry.time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
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
