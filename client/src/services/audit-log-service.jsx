import { AUDIT_LOG_HOUR_MS } from "../constants/audit-log";

function hoursAgo(hours) {
    return new Date(Date.now() - hours * AUDIT_LOG_HOUR_MS).toISOString();
}

const AUDIT_LOG_ENTRIES = [
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

const AUDIT_LOG_PEOPLE = {
    you: { initials: "SA", owner: true },
    adrian: { initials: "AP", owner: false },
};

/**
 * Fetches audit entries matching the supplied filters, newest first.
 * @param {Object} filters Search, person, area and date-range filters.
 * @returns {Object[]} Matching audit entries.
 */
export function getAuditLog(filters) {
    const search = filters.search.trim().toLowerCase();
    const cutoff = filters.range === "all" ? 0 : Date.now() - Number(filters.range) * 24 * AUDIT_LOG_HOUR_MS;
    return AUDIT_LOG_ENTRIES
        .filter((entry) => {
            const text = entry.parts.map((part) => part.text).join("").toLowerCase();
            if (search && !text.includes(search)) return false;
            if (filters.person !== "everyone" && entry.person !== filters.person) return false;
            if (filters.area !== "all" && entry.area !== filters.area) return false;
            return new Date(entry.time).getTime() >= cutoff;
        })
        .map((entry) => ({ ...entry, parts: entry.parts.map((part) => ({ ...part })) }))
        .sort((a, b) => new Date(b.time) - new Date(a.time));
}

/**
 * Fetches details for one audit entry.
 * @param {string} id Audit entry ID.
 * @returns {Object} The entry details.
 */
export function getAuditLogDetails(id) {
    return { id, changedBy: "Signed in account", device: "Web browser" };
}

/**
 * Fetches the temporary actor metadata used by audit-log rows.
 * @returns {Object} Actor metadata keyed by person ID.
 */
export function getAuditLogPeople() {
    return Object.fromEntries(
        Object.entries(AUDIT_LOG_PEOPLE).map(([id, person]) => [id, { ...person }])
    );
}

/**
 * Fetches temporary person-filter choices for the audit log.
 * @returns {Array<{value: string, label: string}>} Person options.
 */
export function getAuditLogPeopleOptions() {
    return [
        { value: "everyone", label: "Everyone" },
        { value: "you", label: "You" },
        { value: "adrian", label: "Adrian P." },
    ];
}
