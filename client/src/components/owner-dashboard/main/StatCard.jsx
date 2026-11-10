// Renders a stat card for the owner dashboard's stats row.
import "../../../styles/owner-dashboard/StatCard.css";

// Card from the Figma stats row, e.g. "Today's visits" or "Pending requests".
/**
 * Renders one dashboard stat: an icon, a big number, a label and a detail line.
 * @param {Object} props - Stat content.
 * @param {string} props.icon - Icon image source.
 * @param {number|string} props.value - The big number.
 * @param {string} props.label - What the number counts.
 * @param {string} props.detail - Supporting line under the label.
 * @returns {JSX.Element} The stat card.
 */
export default function StatCard({ icon, value, label, detail }) {
  return (
    <section className="stat-card">
      <span className="stat-card-badge">
        <img src={icon} alt="" />
      </span>

      <p className="stat-card-value">{value}</p>
      <h2 className="stat-card-label">{label}</h2>
      <p className="stat-card-detail">{detail}</p>
    </section>
  );
}
