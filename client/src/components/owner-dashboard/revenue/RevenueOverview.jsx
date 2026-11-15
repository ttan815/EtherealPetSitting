// Renders the Overview stat cards on the owner's Revenue page.
import OverviewHeader from "../../parent-component/OverviewHeader";
import OverviewCard from "../../parent-component/OverviewCard";
import { getRevenue, getRevenueOverview } from "../../../services/revenue-service";
import dollarIcon from "../../../assets/owner-dashboard/stat-dollar.svg";
import checkIcon from "../../../assets/owner-dashboard/stat-check.svg";
import alertIcon from "../../../assets/owner-dashboard/stat-alert.svg";
import pawIcon from "../../../assets/owner-dashboard/stat-paw.svg";
import "../../../styles/owner-dashboard/revenue/RevenueOverview.css";

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
