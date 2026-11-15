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

/**
 * Display metadata used when an audit entry has no matching person record.
 * @type {{initials: string, owner: boolean}}
 */
export const AUDIT_LOG_UNKNOWN_PERSON = { initials: "?", owner: false };

/** @type {string} Locale used to format audit-log dates and times. */
export const AUDIT_LOG_LOCALE = "en-US";
/** @type {string} Label for audit entries created today. */
export const AUDIT_LOG_TODAY_LABEL = "Today";
/** @type {string} Label for audit entries created yesterday. */
export const AUDIT_LOG_YESTERDAY_LABEL = "Yesterday";
/** @type {Intl.DateTimeFormatOptions} Date options for day group headings. */
export const AUDIT_LOG_DAY_FORMAT_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
/** @type {Intl.DateTimeFormatOptions} Time options for audit row timestamps. */
export const AUDIT_LOG_TIME_FORMAT_OPTIONS = { hour: "numeric", minute: "2-digit" };
/** @type {Intl.DateTimeFormatOptions} Date/time options for expanded audit details. */
export const AUDIT_LOG_DETAILS_FORMAT_OPTIONS = { dateStyle: "medium", timeStyle: "short" };
