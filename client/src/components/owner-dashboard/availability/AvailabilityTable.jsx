// Renders the availability table for the owner's Availability section (DT-323).
import AvailabilityRowActions from "./AvailabilityRowActions";

const STATUS_LABELS = {
    pending: "Request",
    awaiting_admin: "Awaiting admin",
    approved: "Approved",
    disapproved: "Disapproved",
};

/**
 * Turns a 24-hour "HH:MM" string into "9:00 AM".
 * @param {string} time The time in 24-hour format.
 * @returns {string} The time in 12-hour format.
 */
export function formatTime(time) {
    const [h, m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/**
 * Turns a "YYYY-MM-DD" string into "Mon, Nov 16".
 * @param {string} date The date string.
 * @returns {string} The short readable date.
 */
export function formatDate(date) {
    const [y, m, d] = date.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function initials(name) {
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

/**
 * Renders one row per availability slot with its actions.
 * @param {Array<Object>} slots The slots to show (already filtered).
 * @param {Object} handlers Row action callbacks: onApprove, onDisapprove, onEdit, onRemove, onAssign.
 * @returns {JSX.Element} The availability table.
 */
export default function AvailabilityTable({ slots, handlers }) {
    return (
        <div className="av-table-card">
            <table className="av-table">
                <thead>
                    <tr>
                        <th>Admin</th>
                        <th>Service</th>
                        <th>Date &amp; time</th>
                        <th>Price</th>
                        <th>Booking</th>
                        <th>Status</th>
                        <th className="av-th-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.length === 0 && (
                        <tr>
                            <td colSpan={7} className="av-empty">No availability matches these filters.</td>
                        </tr>
                    )}
                    {slots.map((slot) => (
                        <tr key={slot.id}>
                            <td>
                                <div className="av-admin">
                                    <span className="av-avatar">{initials(slot.admin)}</span>
                                    <span className="av-cell-main">{slot.admin}</span>
                                </div>
                            </td>
                            <td className="av-cell-main">{slot.service}</td>
                            <td>
                                <div className="av-cell-main">{formatDate(slot.date)}</div>
                                <div className="av-cell-sub">{formatTime(slot.start)} – {formatTime(slot.end)}</div>
                            </td>
                            <td className="av-cell-main">${slot.price}</td>
                            <td className={slot.customer ? "av-cell-main" : "av-cell-muted"}>
                                {slot.customer ? slot.customer.name : "Open for booking"}
                            </td>
                            <td>
                                {/* TODO: reusable <StatusBadge> component not available */}
                                <span className={`av-badge av-badge-${slot.status}`} title={slot.reason || undefined}>
                                    {STATUS_LABELS[slot.status]}
                                </span>
                            </td>
                            <td className="av-td-actions">
                                <AvailabilityRowActions slot={slot} {...handlers} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
