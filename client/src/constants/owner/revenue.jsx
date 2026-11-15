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

/** @type {Object<string, string>} Revenue chart subtitles keyed by filter. */
export const REVENUE_PERIOD_LABELS = {
    week: "By day · last 7 days",
    month: "By month · last 6 months",
    year: "By year · last 4 years",
    custom: "Custom date range",
};

/** @type {number[]} Placeholder earnings by period, oldest first. */
export const PLACEHOLDER_REVENUE = {
    week: [1120, 1290, 1410, 1310, 1330, 1240],
    month: [2950, 3410, 3880, 4120, 4490, 4860],
    year: [28400, 35120.5, 41760.25, 44310.75],
};

/** @type {Object} Revenue page view metadata keyed by view. */
export const REVENUE_VIEWS = {
    week: { unit: "week", label: "This week", startDate: "2026-09-21", endDate: "2026-09-27" },
    month: { unit: "month", label: "September 2026", startDate: "2026-09-01", endDate: "2026-09-30" },
    year: { unit: "year", label: "2026", startDate: "2026-01-01", endDate: "2026-12-31" },
};

/** @type {Object} Revenue page overview data keyed by period. */
export const REVENUE_OVERVIEW_DATA = {
    week: { periodName: "This week", previousPeriodName: "last week", depositsCollected: 140, depositBookingCount: 7, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 14 },
    month: { periodName: "September", previousPeriodName: "August", depositsCollected: 620, depositBookingCount: 31, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 58 },
    year: { periodName: "2026", previousPeriodName: "2025", depositsCollected: 5480, depositBookingCount: 274, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 612 },
};

/** @type {Object} Dashboard revenue summaries and chart data keyed by range. */
export const DASHBOARD_REVENUE_DATA = {
    week: {
        summary: { total: 1240, periodLabel: "This week", changePercent: -7, comparedTo: "last week", unpaidVisitCount: 3, unpaidAmount: 180 },
        weeks: [
            { label: "Sep 1", amount: 980 },
            { label: "Sep 8", amount: 1310 },
            { label: "Sep 15", amount: 1330 },
            { label: "Sep 22", amount: 1240, isCurrent: true },
        ],
        services: [
            { name: "Dog Walking", amount: 470 },
            { name: "Overnight Stays", amount: 340 },
            { name: "Drop-in Care", amount: 225 },
            { name: "Whole Day Care", amount: 125 },
            { name: "Medication", amount: 60 },
            { name: "Nail Trims", amount: 20 },
        ],
    },
    month: {
        summary: { total: 4860, periodLabel: "September 2026", changePercent: 8, comparedTo: "August", unpaidVisitCount: 3, unpaidAmount: 180 },
        weeks: [
            { label: "Wk 1", amount: 980 },
            { label: "Wk 2", amount: 1310 },
            { label: "Wk 3", amount: 1330 },
            { label: "Wk 4", amount: 1240, isCurrent: true },
        ],
        services: [
            { name: "Dog Walking", amount: 1850 },
            { name: "Overnight Stays", amount: 1310 },
            { name: "Drop-in Care", amount: 875 },
            { name: "Whole Day Care", amount: 485 },
            { name: "Medication", amount: 240 },
            { name: "Nail Trims", amount: 100 },
        ],
    },
    custom: {
        summary: { total: 7700, periodLabel: "Custom range (Aug 18 – Sep 27)", changePercent: 5, comparedTo: "the 6 weeks before", unpaidVisitCount: 3, unpaidAmount: 180 },
        weeks: [
            { label: "Aug 18", amount: 1120 },
            { label: "Aug 25", amount: 1290 },
            { label: "Sep 1", amount: 1410 },
            { label: "Sep 8", amount: 1310 },
            { label: "Sep 15", amount: 1330 },
            { label: "Sep 22", amount: 1240, isCurrent: true },
        ],
        services: [
            { name: "Dog Walking", amount: 2930 },
            { name: "Overnight Stays", amount: 2080 },
            { name: "Drop-in Care", amount: 1390 },
            { name: "Whole Day Care", amount: 770 },
            { name: "Medication", amount: 380 },
            { name: "Nail Trims", amount: 150 },
        ],
    },
};

/** @type {Array<Object>} Temporary service breakdown for the revenue page. */
export const TEMP_SERVICE_REVENUE = [
    { id: 1, name: "Dog Walking", revenue: 1850 },
    { id: 2, name: "Overnight Stays", revenue: 1310 },
    { id: 3, name: "Drop-in Care", revenue: 875 },
    { id: 4, name: "Whole Day Care", revenue: 485 },
    { id: 5, name: "Medication", revenue: 240 },
    { id: 6, name: "Nail Trims", revenue: 100 },
];

/** @type {Array<Object>} Temporary unpaid appointment rows for the Still Owed table. */
export const TEMP_UNPAID_VISITS = [
    { id: 1, initials: "SM", customer: "Sarah M.", pet: "Biscuit", service: "Dog Walking", date: "Mon, Sep 28", amount: 60 },
    { id: 2, initials: "EL", customer: "Emma L.", pet: "Oliver", service: "Overnight Stay", date: "Sat, Sep 26", amount: 75 },
    { id: 3, initials: "KP", customer: "Kevin P.", pet: "Max", service: "Dog Walking", date: "Thu, Sep 24", amount: 45 },
];
