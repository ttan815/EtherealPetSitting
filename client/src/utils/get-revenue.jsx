// Revenue helper for the owner's Revenue page (DT-349).

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
