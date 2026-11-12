import OverviewCard from "./OverviewCard";
import "../../../styles/owner-dashboard/OverviewHeader.css";
import { OWNER_OVERVIEW_ITEMS } from "../../../constants/owner-overview-items";

/**
 * Renders the owner dashboard overview header with summary cards.
 * @returns {JSX.Element} The overview header section.
 */
function OverviewHeader() {
  return (
    <section className="overview-header">
      {OWNER_OVERVIEW_ITEMS.map(({ icon, title, subtitle, number }) => (
        <OverviewCard
          key={title}
          icon={icon}
          title={title}
          subtitle={subtitle}
          number={number}
        />
      ))}
    </section>
  );
}

export default OverviewHeader;
