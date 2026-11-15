// Renders the Overview stat cards on the owner's Revenue page.
import OverviewHeader from "../../parent-component/OverviewHeader";
import OverviewCard from "../../parent-component/OverviewCard";
import { getRevenue, getRevenueOverview } from "../../../services/revenue-service";
import { getRevenueOverviewCards } from "../../../constants/revenue-overview";
import "../../../styles/owner-dashboard/revenue/RevenueOverview.css";

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
  const overviewCards = getRevenueOverviewCards(currentEarnings, previousEarnings, overview, unitDate);

  return (
    <OverviewHeader className="revenue-overview">
      {overviewCards.map((card) => (
        <OverviewCard key={card.title} {...card} />
      ))}
    </OverviewHeader>
  );
}
