import {
  DASHBOARD_REVENUE_DATA,
  PLACEHOLDER_REVENUE,
  REVENUE_PERIOD_LABELS,
  REVENUE_OVERVIEW_DATA,
  REVENUE_VIEWS,
  TEMP_SERVICE_REVENUE
} from "../../constants/owner/revenue";

// 4860.456 -> 4860.46
/**
 * Rounds a revenue amount to cents.
 * @param {number} amount Amount to round
 * @returns {number} Amount rounded to two decimal places
 */
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
  const overview = REVENUE_OVERVIEW_DATA[unitDate];
  return overview ? { ...overview } : undefined;
}

/**
 * Fetches temporary Revenue dashboard totals for a selected range.
 * @param {string} range The selected range.
 * @returns {Object|undefined} The revenue summary.
 */
export function getRevenueSummary(range) {
  const summary = DASHBOARD_REVENUE_DATA[range]?.summary;
  return summary ? { ...summary } : undefined;
}

/**
 * Fetches temporary weekly revenue chart data.
 * @param {string} range The selected range.
 * @returns {Object[]} Weekly revenue entries.
 */
export function getRevenueByWeek(range) {
  return (DASHBOARD_REVENUE_DATA[range]?.weeks ?? []).map((week) => ({ ...week }));
}

/**
 * Fetches temporary revenue grouped by service.
 * @param {string} range The selected range.
 * @returns {Object[]} Revenue entries by service.
 */
export function getEarningsByService(range) {
  return (DASHBOARD_REVENUE_DATA[range]?.services ?? []).map((service) => ({ ...service }));
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
  return Object.prototype.hasOwnProperty.call(DASHBOARD_REVENUE_DATA, range);
}

/**
 * Formats a numeric revenue amount as US dollars.
 * @param {number} amount Revenue amount
 * @returns {string} Currency-formatted revenue
 */
export function formatRevenue(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount || 0);
}

/**
 * Formats a revenue amount for the compact owner dashboard panel.
 * @param {number} amount Revenue amount
 * @returns {string} Dollar-prefixed amount with grouped thousands
 */
export function formatRevenueTotal(amount) {
  return `$${amount.toLocaleString("en-US")}`;
}

/**
 * Normalizes numeric and object revenue records for chart rendering.
 * @param {Array<Object|number>} records Revenue records
 * @param {string} period Selected period type
 * @returns {Array<Object>} Chart-ready revenue records with period labels
 */
export function normalizeRevenue(records, period = "month") {
  const now = new Date();
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const yearFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric" });
  const count = records.length;

  return records.map((item, index) => {
    const record = typeof item === "number"
      ? { revenue: item }
      : item;
    const date = record.date || record.unitDate || null;
    let label = record.label || date || "";
    let isCurrent = Boolean(record.isCurrent);

    if (period === "month" && typeof item === "number") {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - (count - index - 1), 1);
      label = monthFormatter.format(monthDate);
      isCurrent = index === count - 1;
    } else if (period === "week" && typeof item === "number") {
      const weekDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (count - index - 1) * 7);
      label = monthFormatter.format(weekDate) + ` ${weekDate.getDate()}`;
      isCurrent = index === count - 1;
    } else if (period === "year" && typeof item === "number") {
      label = yearFormatter.format(new Date(now.getFullYear() - (count - index - 1), 0, 1));
      isCurrent = index === count - 1;
    } else if (!label) {
      label = period === "week" ? `Week ${index + 1}` : `Range ${index + 1}`;
    }

    return {
      label,
      date,
      revenue: Number(record.revenue ?? record.amount ?? record.total ?? 0),
      isCurrent
    };
  });
}

/**
 * Determines whether a chart record represents the current period.
 * @param {Object} item Normalized revenue chart record
 * @param {string} currentUnitDate Current period key, when supplied
 * @returns {boolean} Whether the record should receive current-period styling
 */
export function isCurrentRevenuePeriod(item, currentUnitDate) {
  if (item.isCurrent) return true;
  return Boolean(currentUnitDate && item.date && item.date === currentUnitDate);
}

/**
 * Returns temporary service earnings for a selected revenue period.
 * @param {string} unitDate Selected reporting period
 * @returns {Promise<Array<Object>>} Service revenue records
 */
export async function getServiceRevenue(unitDate) {
  void unitDate;
  return TEMP_SERVICE_REVENUE.map((service) => ({ ...service }));
}

/**
 * Marks an unpaid appointment as paid.
 * @param {number|string} appointmentId Appointment identifier
 * @returns {Promise<boolean>} Whether the update succeeded
 */
export async function markAsPaid(appointmentId) {
  void appointmentId;
  return true;
}

/**
 * Sends a payment reminder for an unpaid appointment.
 * @param {number|string} appointmentId Appointment identifier
 * @returns {Promise<boolean>} Whether the reminder was accepted
 */
export async function sendReminder(appointmentId) {
  void appointmentId;
  return true;
}

/**
 * Returns the display label for a revenue chart period.
 * @param {string} period Selected period: week, month, year, or custom
 * @returns {string} Human-readable period description
 */
export function getRevenuePeriodLabel(period) {
  return REVENUE_PERIOD_LABELS[period] ?? "Revenue by period";
}
