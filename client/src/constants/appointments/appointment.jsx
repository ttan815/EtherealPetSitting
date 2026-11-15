/**
 * Status tabs shown in the owner appointments list, in display order.
 * @returns {{ key: string, label: string, statuses: string[] | null }[]} Appointment tab definitions.
 */
export const APPOINTMENT_TABS = [
    { key: "all", label: "All", statuses: null },
    { key: "requests", label: "Requests", statuses: ["request"] },
    { key: "upcoming", label: "Upcoming", statuses: ["confirmed", "in_progress"] },
    { key: "completed", label: "Completed", statuses: ["completed"] },
    { key: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

/**
 * Weekday labels for the reschedule calendar, starting on Monday.
 * @returns {string[]} Weekday abbreviations in calendar order.
 */
export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Human-readable labels keyed by appointment status.
 * @returns {Record<string, string>} Appointment status labels.
 */
export const STATUS_LABELS = {
    request: "Request",
    confirmed: "Confirmed",
    in_progress: "In progress",
    completed: "Completed",
    cancelled: "Cancelled",
};

/**
 * Initial values for the appointments search and dropdown filters.
 * @returns {{ search: string, sitter: string, service: string }} Default appointment filters.
 */
export const DEFAULT_FILTERS = { search: "", sitter: "all", service: "all" };
