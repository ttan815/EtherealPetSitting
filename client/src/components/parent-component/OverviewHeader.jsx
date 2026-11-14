import "../../styles/owner-dashboard/OverviewHeader.css";

/**
 * Renders a group of overview cards.
 * @param {JSX.Element} children The overview cards.
 * @param {string} className The class applied to the card group.
 * @returns {JSX.Element} The overview header section.
 */
function OverviewHeader({ children, className = "overview-header" }) {
  return (
    <section className={className}>
      {children}
    </section>
  );
}

export default OverviewHeader;
