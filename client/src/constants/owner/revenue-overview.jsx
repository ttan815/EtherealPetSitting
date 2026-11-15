import dollarIcon from "../../assets/owner-dashboard/stat-dollar.svg";
import checkIcon from "../../assets/owner-dashboard/stat-check.svg";
import alertIcon from "../../assets/owner-dashboard/stat-alert.svg";
import pawIcon from "../../assets/owner-dashboard/stat-paw.svg";

/**
 * Formats a revenue overview value as localized currency.
 * @param {number} amount Amount to format
 * @returns {string} Formatted currency value
 */
function formatMoney(amount) {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

/**
 * Describes the percentage change between two revenue amounts.
 * @param {number} current Current-period amount
 * @param {number} previous Previous-period amount
 * @param {string} previousPeriodName Previous-period label
 * @returns {string} Human-readable change description
 */
function formatChange(current, previous, previousPeriodName) {
  const percent = Math.round(((current - previous) / previous) * 100);
  return `${percent >= 0 ? "up" : "down"} ${Math.abs(percent)}% from ${previousPeriodName}`;
}

/**
 * Builds overview card data for the selected revenue period.
 * @param {number} currentEarnings Current-period earnings
 * @param {number} previousEarnings Previous-period earnings
 * @param {Object} overview Revenue totals and labels
 * @param {string} unitDate Selected period unit
 * @returns {Array<Object>} Overview cards ready for rendering
 */
export function getRevenueOverviewCards(currentEarnings, previousEarnings, overview, unitDate) {
  return [
    {
      icon: dollarIcon,
      number: formatMoney(currentEarnings),
      title: "Total earnings",
      subtitle: `${overview.periodName} · ${formatChange(currentEarnings, previousEarnings, overview.previousPeriodName)}`,
    },
    {
      icon: checkIcon,
      number: formatMoney(overview.depositsCollected),
      title: "Deposits collected",
      subtitle: `${overview.depositBookingCount} bookings`,
    },
    {
      icon: alertIcon,
      number: formatMoney(overview.stillOwed),
      title: "Still owed",
      subtitle: `${overview.unpaidVisitCount} visits unpaid`,
    },
    {
      icon: pawIcon,
      number: overview.visitsCompleted,
      title: "Visits completed",
      subtitle: `This ${unitDate}`,
    },
  ];
}