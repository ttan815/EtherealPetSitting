import "../../styles/owner-dashboard/OverviewCard.css";

/**
 * Renders a single overview stat card for the owner dashboard.
 * @param {{icon: React.ComponentType|string, title: string, subtitle: string, number: string|number}} props - Overview card details.
 * @returns {JSX.Element} The rendered overview card.
 */
function OverviewCard({icon: Icon, title, subtitle, number}) {
    return (
        <div className="stat-today-s-visits">
            {Icon !== "" && (
                <div className="row">
                    <div className="icon-badge">
                        {typeof Icon === "string" ? <img src={Icon} alt="" /> : <Icon />}
                    </div>
                </div>
            )}

            {Icon === "" && <div className="today-s-visits">{title}</div>}

            {Icon !== "" && <div className="spacer"></div>}

            <div className="_6">{number}</div>

            {Icon !== "" && <div className="today-s-visits">{title}</div>}

            <div className="_2-completed-4-upcoming">{subtitle}</div>
        </div>

    );
}

export default OverviewCard;