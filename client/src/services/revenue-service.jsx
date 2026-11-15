// Temporary revenue data and service adapters.

// Temporary placeholder earnings, oldest period first; the last one is the current period.
// week: the last 6 weeks, month: the last 6 months (Apr – Sep 2026), year: the last 4 years (2023 – 2026)
const PLACEHOLDER_REVENUE = {
  week: [1120, 1290, 1410, 1310, 1330, 1240],
  month: [2950, 3410, 3880, 4120, 4490, 4860],
  year: [28400, 35120.5, 41760.25, 44310.75],
};

// 4860.456 -> 4860.46
function roundToCents(amount) {
  return Math.round(amount * 100) / 100;
}

/**
 * Gets the owner's total earnings for each recent period, oldest first; the last one is the current period.
 * @param {string} unitDate The period length: "week", "month" or "year".
 * @returns {number[]} Earnings for each period, rounded to 2 decimal places; empty for an unknown unitDate.
 */
export function getRevenue(unitDate) {
  const revenue = PLACEHOLDER_REVENUE[unitDate] ?? []; // BACKEND: result from fetch()
  return revenue.map(roundToCents);
}

const REVENUE_VIEWS = {
  week: { unit: "week", label: "This week", startDate: "2026-09-21", endDate: "2026-09-27" },
  month: { unit: "month", label: "September 2026", startDate: "2026-09-01", endDate: "2026-09-30" },
  year: { unit: "year", label: "2026", startDate: "2026-01-01", endDate: "2026-12-31" },
};

const REVENUE_OVERVIEW = {
  week: { periodName: "This week", previousPeriodName: "last week", depositsCollected: 140, depositBookingCount: 7, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 14 },
  month: { periodName: "September", previousPeriodName: "August", depositsCollected: 620, depositBookingCount: 31, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 58 },
  year: { periodName: "2026", previousPeriodName: "2025", depositsCollected: 5480, depositBookingCount: 274, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 612 },
};

const DASHBOARD_REVENUE = {
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

/**
 * Fetches the temporary Revenue page period for a selected view.
 * @param {string} unitDate The view key.
 * @returns {Object|undefined} Period details.
 */
export function getRevenueView(unitDate) {
  const view = REVENUE_VIEWS[unitDate];
  return view ? { ...view } : undefined;
}

/**
 * Fetches temporary deposits, unpaid balances and visit totals for a period.
 * @param {string} unitDate The period key.
 * @returns {Object|undefined} Period overview.
 */
export function getRevenueOverview(unitDate) {
  const overview = REVENUE_OVERVIEW[unitDate];
  return overview ? { ...overview } : undefined;
}

/**
 * Fetches temporary Revenue dashboard totals for a selected range.
 * @param {string} range The selected range.
 * @returns {Object|undefined} The revenue summary.
 */
export function getRevenueSummary(range) {
  const summary = DASHBOARD_REVENUE[range]?.summary;
  return summary ? { ...summary } : undefined;
}

/**
 * Fetches temporary weekly revenue chart data.
 * @param {string} range The selected range.
 * @returns {Object[]} Weekly revenue entries.
 */
export function getRevenueByWeek(range) {
  return (DASHBOARD_REVENUE[range]?.weeks ?? []).map((week) => ({ ...week }));
}

/**
 * Fetches temporary revenue grouped by service.
 * @param {string} range The selected range.
 * @returns {Object[]} Revenue entries by service.
 */
export function getEarningsByService(range) {
  return (DASHBOARD_REVENUE[range]?.services ?? []).map((service) => ({ ...service }));
}

/**
 * Exports the temporary Revenue page summary.
 * @param {{startDate: string, endDate: string}} range Date range.
 * @returns {boolean} Whether the export was accepted.
 */
export function exportRevenueSummary(range) {
  return Boolean(range?.startDate && range?.endDate);
}

/**
 * Exports the temporary owner dashboard revenue report.
 * @param {string} range The selected range.
 * @returns {boolean} Whether the export was accepted.
 */
export function exportDashboardRevenue(range) {
  return Object.prototype.hasOwnProperty.call(DASHBOARD_REVENUE, range);
}
