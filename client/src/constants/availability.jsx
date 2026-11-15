export const AVAILABILITY_CHIPS = [
    { key: "requests", label: "Requests", status: "pending", showCount: true },
    { key: "awaiting", label: "Awaiting admin", status: "awaiting_admin", showCount: true },
    { key: "approved", label: "Approved", status: "approved", showCount: false },
    { key: "disapproved", label: "Disapproved", status: "disapproved", showCount: false },
    { key: "all", label: "All", status: null, showCount: false },
];

export const DEFAULT_OWNER_AVAILABILITY_FILTERS = { search: "", admin: "all", service: "all" };

export const AVAILABILITY_STATUS_LABELS = {
    pending: "Request",
    awaiting_admin: "Awaiting admin",
    approved: "Approved",
    disapproved: "Disapproved",
};

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
