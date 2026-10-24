import "../styles/UpcomingVisitButton.css"

function UpcomingVisitButton() {
    return (
        <button className="tab-pill-active">
            <div className="upcoming-visits">Upcoming Visits</div>

            {/* Hard Coded */}
            <div className="counter-badge">
                <div className="_3">3</div>
            </div>
        </button>
    );
}

export default UpcomingVisitButton;