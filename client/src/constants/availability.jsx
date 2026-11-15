/**
 * Filter chips shown in the owner availability section.
 * @type {Array<{id: string, label: string}>}
 */
export const AVAILABILITY_CHIPS = [
    { key: "requests", label: "Requests", status: "pending", showCount: true },
    { key: "awaiting", label: "Awaiting admin", status: "awaiting_admin", showCount: true },
    { key: "approved", label: "Approved", status: "approved", showCount: false },
    { key: "disapproved", label: "Disapproved", status: "disapproved", showCount: false },
    { key: "all", label: "All", status: null, showCount: false },
];

/**
 * Default filters for the owner availability table.
 * @type {{search: string, admin: string, service: string}}
 */
export const DEFAULT_OWNER_AVAILABILITY_FILTERS = { search: "", admin: "all", service: "all" };

/**
 * Labels for availability status values.
 * @type {Object<string, string>}
 */
export const AVAILABILITY_STATUS_LABELS = {
    pending: "Request",
    awaiting_admin: "Awaiting admin",
    approved: "Approved",
    disapproved: "Disapproved",
};

/**
 * Empty values for the owner availability editor.
 * @type {Object}
 */
export const AVAILABILITY_EMPTY_FORM = {
    admin: "",
    service: "",
    date: "",
    start: "",
    end: "",
    price: "",
    booking: "open",
    customerId: "",
};

/**
 * Shared icon sizing and stroke settings for availability controls.
 * @type {Object}
 */
export const AVAILABILITY_ICON_PROPS = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};
