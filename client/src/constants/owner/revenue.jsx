/**
 * Time ranges available in the owner revenue view.
 * @type {Array<{id: string, label: string}>}
 */
export const REVENUE_VIEW_OPTIONS = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
];

/**
 * Time ranges available in the dashboard revenue panel.
 * @type {Array<{id: string, label: string}>}
 */
export const DASHBOARD_REVENUE_RANGE_OPTIONS = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "custom", label: "Custom" },
];

/** @type {number} Maximum chart-bar height in pixels. */
export const REVENUE_BAR_MAX_HEIGHT = 150;
