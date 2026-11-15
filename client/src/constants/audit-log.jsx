/**
 * Area filters available in the owner audit log.
 * @type {Array<{value: string, label: string}>}
 */
export const AUDIT_LOG_AREA_OPTIONS = [
    { value: "all", label: "All areas" },
    { value: "Appointments", label: "Appointments" },
    { value: "Customers & Pets", label: "Customers & Pets" },
    { value: "Reviews", label: "Reviews" },
    { value: "Availability", label: "Availability" },
    { value: "Admins", label: "Admins" },
    { value: "Settings", label: "Settings" },
];

/**
 * Date-range filters available in the owner audit log.
 * @type {Array<{value: string, label: string}>}
 */
export const AUDIT_LOG_RANGE_OPTIONS = [
    { value: "1", label: "Today" },
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "all", label: "All time" },
];

/**
 * Initial filter values for the owner audit log.
 * @type {{search: string, person: string, area: string, range: string}}
 */
export const DEFAULT_AUDIT_LOG_FILTERS = {
    search: "",
    person: "everyone",
    area: "all",
    range: "7",
};

/** @type {number} Number of audit rows added per pagination step. */
export const AUDIT_LOG_PAGE_SIZE = 8;
/** @type {number} Milliseconds in one hour. */
export const AUDIT_LOG_HOUR_MS = 60 * 60 * 1000;
