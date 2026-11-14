// Renders the today's visits stat card on the owner dashboard.
import pawIcon from "../../../assets/owner-dashboard/stat-paw.svg";
import "../../../styles/owner-dashboard/TodaysVisitsCard.css";

// Placeholder version of the "Today's visits" stat from Figma, so Mark complete
// in Today's Schedule has something to update. The full stats row is still to come.
/**
 * Renders how many visits are on today's schedule and how many are done.
 * @param {{visits: Object[]}} props - Today's visits, from getTodaySchedule().
 * @returns {JSX.Element} The today's visits card.
 */
export default function TodaysVisitsCard({ visits }) {
  const completedCount = visits.filter((visit) => visit.status === "completed").length;
  const upcomingCount = visits.length - completedCount; // includes the visit in progress

  return (
    <section className="todays-visits-card">
      <span className="todays-visits-card-badge">
        <img src={pawIcon} alt="" />
      </span>

      <p className="todays-visits-card-count">{visits.length}</p>
      <h2 className="todays-visits-card-label">Today’s visits</h2>
      <p className="todays-visits-card-detail">
        {completedCount} completed · {upcomingCount} upcoming
      </p>
    </section>
  );
}
