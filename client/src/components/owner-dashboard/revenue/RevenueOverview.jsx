// Renders the Overview stat cards on the owner's Revenue page.
import OverviewHeader from "../../parent-component/OverviewHeader";
import OverviewCard from "../../parent-component/OverviewCard";
import { getRevenue } from "../../../utils/get-revenue";
import dollarIcon from "../../../assets/owner-dashboard/stat-dollar.svg";
import checkIcon from "../../../assets/owner-dashboard/stat-check.svg";
import alertIcon from "../../../assets/owner-dashboard/stat-alert.svg";
import pawIcon from "../../../assets/owner-dashboard/stat-paw.svg";
import "../../../styles/owner-dashboard/revenue/RevenueOverview.css";

// Temporary placeholder numbers for the cards that getRevenue() doesn't cover
const PLACEHOLDER_OVERVIEW = {
  week: { periodName: "This week", previousPeriodName: "last week", depositsCollected: 140, depositBookingCount: 7, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 14 },
  month: { periodName: "September", previousPeriodName: "August", depositsCollected: 620, depositBookingCount: 31, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 58 },
  year: { periodName: "2026", previousPeriodName: "2025", depositsCollected: 5480, depositBookingCount: 274, stillOwed: 180, unpaidVisitCount: 3, visitsCompleted: 612 },
};

/**
 * Gets the deposits, unpaid visits and completed visits for a period.
 * @param {string} unitDate The period: "week", "month" or "year".
 * @returns {Object} Period names, deposits collected and their booking count, amount still owed, unpaid visits and visits completed.
 */
function getRevenueOverview(unitDate) {
  const overview = PLACEHOLDER_OVERVIEW[unitDate]; // BACKEND: result from fetch()
  return overview;
}

// "$4,860", "$44,310.75"
function formatMoney(amount) {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

// "up 8% from August", "down 7% from last week"
function formatChange(current, previous, previousPeriodName) {
  const percent = Math.round(((current - previous) / previous) * 100);
  return `${percent >= 0 ? "up" : "down"} ${Math.abs(percent)}% from ${previousPeriodName}`;
}

/**
 * Renders the Overview cards: total earnings, deposits collected, still owed and visits completed.
 * @param {{unitDate: string}} props - The view chosen in the header: "week", "month" or "year".
 * @returns {JSX.Element} The overview cards.
 */
export default function RevenueOverview({ unitDate }) {
  const revenue = getRevenue(unitDate);
  const currentEarnings = revenue[revenue.length - 1];
  const previousEarnings = revenue[revenue.length - 2];
  const overview = getRevenueOverview(unitDate);
  const overviewCards = [
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

  return (
    <OverviewHeader className="revenue-overview">
      {overviewCards.map((card) => (
        <OverviewCard key={card.title} {...card} />
      ))}
    </OverviewHeader>
  );
}
