export const AUDIT_LOG_AREA_OPTIONS = [
    { value: "all", label: "All areas" },
    { value: "Appointments", label: "Appointments" },
    { value: "Customers & Pets", label: "Customers & Pets" },
    { value: "Reviews", label: "Reviews" },
    { value: "Availability", label: "Availability" },
    { value: "Admins", label: "Admins" },
    { value: "Settings", label: "Settings" },
];

export const AUDIT_LOG_RANGE_OPTIONS = [
    { value: "1", label: "Today" },
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "all", label: "All time" },
];

export const DEFAULT_AUDIT_LOG_FILTERS = {
    search: "",
    person: "everyone",
    area: "all",
    range: "7",
};

export const AUDIT_LOG_PAGE_SIZE = 8;
export const AUDIT_LOG_HOUR_MS = 60 * 60 * 1000;
