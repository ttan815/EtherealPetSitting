// search box and dropdown filters for the audit log
import { Search } from "lucide-react";
import "../../../styles/owner-dashboard/audit-log/AuditLog.css";

export const PEOPLE_OPTIONS = [
    { value: "everyone", label: "Everyone" },
    { value: "you", label: "You" },
    { value: "adrian", label: "Adrian P." },
];

export const AREA_OPTIONS = [
    { value: "all", label: "All areas" },
    { value: "Appointments", label: "Appointments" },
    { value: "Customers & Pets", label: "Customers & Pets" },
    { value: "Reviews", label: "Reviews" },
    { value: "Availability", label: "Availability" },
    { value: "Admins", label: "Admins" },
    { value: "Settings", label: "Settings" },
];

export const RANGE_OPTIONS = [
    { value: "1", label: "Today" },
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "all", label: "All time" },
];

export const DEFAULT_FILTERS = { search: "", person: "everyone", area: "all", range: "7" };

const HOUR = 60 * 60 * 1000;

/**
 * Makes a date that is a set number of hours before now, so the sample data always looks recent.
 * @param {number} hours How many hours back.
 * @returns {string} The date as an iso string.
 */
function hoursAgo(hours) {
    return new Date(Date.now() - hours * HOUR).toISOString();
}

// sample data until the backend is ready, pet and people names are made up
const SAMPLE_LOG = [
    { id: "l1", time: hoursAgo(1), person: "you", area: "Appointments", parts: [{ text: "You", bold: true }, { text: " accepted " }, { text: "Coco", bold: true }, { text: "’s overnight stay request (Oct 3 – Oct 5)" }] },
    { id: "l2", time: hoursAgo(3), person: "adrian", area: "Appointments", parts: [{ text: "Adrian P.", bold: true }, { text: " marked " }, { text: "Luna", bold: true }, { text: "’s drop-in visit as complete" }] },
    { id: "l3", time: hoursAgo(5), person: "adrian", area: "Customers & Pets", parts: [{ text: "Adrian P.", bold: true }, { text: " updated " }, { text: "Mochi", bold: true }, { text: "’s medication notes" }] },
    { id: "l4", time: hoursAgo(26), person: "you", area: "Reviews", parts: [{ text: "You rejected a review from Kevin P. and sent a reason", bold: true }] },
    { id: "l5", time: hoursAgo(28), person: "you", area: "Availability", parts: [{ text: "You", bold: true }, { text: " changed " }, { text: "Friday", bold: true }, { text: " hours to 8:00 AM – 12:00 PM, 1:00 PM – 5:00 PM" }] },
    { id: "l6", time: hoursAgo(33), person: "you", area: "Customers & Pets", parts: [{ text: "You", bold: true }, { text: " added a new customer, " }, { text: "Lisa W.", bold: true }] },
    { id: "l7", time: hoursAgo(50), person: "you", area: "Admins", parts: [{ text: "You", bold: true }, { text: " invited " }, { text: "sitter.jamie@email.com", bold: true }, { text: " as an admin" }] },
    { id: "l8", time: hoursAgo(56), person: "adrian", area: "Appointments", parts: [{ text: "Adrian P.", bold: true }, { text: " declined " }, { text: "Max", bold: true }, { text: "’s walk request (no sitter available)" }] },
    { id: "l9", time: hoursAgo(74), person: "you", area: "Settings", parts: [{ text: "You", bold: true }, { text: " changed the deposit for bookings up to " }, { text: "60 days", bold: true }, { text: " ahead to $50" }] },
    { id: "l10", time: hoursAgo(98), person: "adrian", area: "Reviews", parts: [{ text: "Adrian P.", bold: true }, { text: " approved a review from " }, { text: "Sarah M.", bold: true }] },
    { id: "l11", time: hoursAgo(120), person: "you", area: "Appointments", parts: [{ text: "You", bold: true }, { text: " rescheduled " }, { text: "Pepper", bold: true }, { text: "’s visit to Oct 6" }] },
    { id: "l12", time: hoursAgo(150), person: "adrian", area: "Customers & Pets", parts: [{ text: "Adrian P.", bold: true }, { text: " added care notes for " }, { text: "Oliver", bold: true }] },
    { id: "l13", time: hoursAgo(400), person: "you", area: "Settings", parts: [{ text: "You", bold: true }, { text: " turned off " }, { text: "Grooming Care", bold: true }] },
];

/**
 * Gets audit log entries that match the filters, newest first.
 * @param {Object} filters The { search, person, area, range } filters.
 * @returns {Array} The matching log entries.
 */
export function getAuditLog(filters) {
    // TODO: replace with backend call
    const search = filters.search.trim().toLowerCase();
    const cutoff = filters.range === "all" ? 0 : Date.now() - Number(filters.range) * 24 * HOUR;

    const temp = SAMPLE_LOG.filter((entry) => {
        const text = entry.parts.map((p) => p.text).join("").toLowerCase();
        if (search && !text.includes(search)) return false;
        if (filters.person !== "everyone" && entry.person !== filters.person) return false;
        if (filters.area !== "all" && entry.area !== filters.area) return false;
        return new Date(entry.time).getTime() >= cutoff;
    }).sort((a, b) => new Date(b.time) - new Date(a.time));

    return temp;
}

/**
 * Renders one dropdown filter.
 * @param {string} label Name read out by screen readers.
 * @param {string} value The selected value.
 * @param {Array} options The { value, label } choices.
 * @param {Function} onChange Called with the new value.
 * @returns {JSX.Element} The dropdown.
 */
function FilterSelect({ label, value, options, onChange }) {
    // TODO: reusable select dropdown component not available
    return (
        <select className="al-select" aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

/**
 * Renders the search box and the person, area, and date range filters.
 * @param {Object} filters The current { search, person, area, range } filters.
 * @param {Function} onChange Called with the updated filters object.
 * @returns {JSX.Element} The filter bar.
 */
export default function AuditLogFilters({ filters, onChange }) {
    function update(field, value) {
        onChange({ ...filters, [field]: value });
    }

    return (
        <div className="al-filters">
            <label className="al-search">
                <Search size={16} strokeWidth={1.75} aria-hidden="true" />
                <input
                    type="search"
                    placeholder="Search activity"
                    aria-label="Search activity"
                    value={filters.search}
                    onChange={(e) => update("search", e.target.value)}
                />
            </label>
            <FilterSelect label="Person" value={filters.person} options={PEOPLE_OPTIONS} onChange={(v) => update("person", v)} />
            <FilterSelect label="Area" value={filters.area} options={AREA_OPTIONS} onChange={(v) => update("area", v)} />
            <FilterSelect label="Date range" value={filters.range} options={RANGE_OPTIONS} onChange={(v) => update("range", v)} />
        </div>
    );
}
