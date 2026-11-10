// Renders the today's schedule card on the owner dashboard.
import pawIcon from "../../../assets/owner-dashboard/schedule-paw.svg";
import checkIcon from "../../../assets/owner-dashboard/status-check.svg";
import arrowIcon from "../../../assets/owner-dashboard/link-arrow.svg";
import "../../../styles/owner-dashboard/TodaysSchedule.css";

const STATUS_LABELS = {
  completed: "Completed",
  "in-progress": "In progress",
  upcoming: "Upcoming",
};

/**
 * Renders today's visits with their status; visits that aren't done can be marked complete.
 * @param {Object} props - Visits and click handlers.
 * @param {Object[]} props.visits - Today's visits, from getTodaySchedule().
 * @param {Function} props.onMarkComplete - Called with a visit's id when "Mark complete" is clicked.
 * @param {Function} props.onViewCalendar - Called when "View calendar" is clicked.
 * @returns {JSX.Element} The today's schedule card.
 */
export default function TodaysSchedule({ visits, onMarkComplete, onViewCalendar }) {
  return (
    <section className="todays-schedule" aria-labelledby="todays-schedule-title">
      <div className="todays-schedule-header">
        <h2 id="todays-schedule-title" className="todays-schedule-title">
          Today’s Schedule
        </h2>

        <button type="button" className="todays-schedule-link" onClick={onViewCalendar}>
          View calendar
          <img src={arrowIcon} alt="" />
        </button>
      </div>

      <ul className="todays-schedule-list">
        {visits.map((visit) => {
          const isCompleted = visit.status === "completed";

          return (
            <li key={visit.id} className="schedule-visit">
              <div className="schedule-visit-time">
                <span className="schedule-visit-strong">{visit.time}</span>
                <span>{visit.duration}</span>
              </div>

              {/* Paw placeholder until pets have photos */}
              <span className="schedule-visit-avatar">
                <img src={pawIcon} alt="" />
              </span>

              <div className="schedule-visit-info">
                <span className="schedule-visit-strong">
                  {visit.petName} · {visit.breed}
                </span>
                <span>
                  {visit.service} for {visit.customerName}
                </span>
                <span>Sitter: {visit.sitterName}</span>
              </div>

              <div className="schedule-visit-status">
                <span className={`schedule-status schedule-status-${visit.status}`}>
                  {isCompleted && <img src={checkIcon} alt="" />}
                  {STATUS_LABELS[visit.status]}
                </span>

                {!isCompleted && (
                  <button
                    type="button"
                    className="schedule-visit-complete"
                    aria-label={`Mark ${visit.petName}'s visit complete`}
                    onClick={() => onMarkComplete(visit.id)}
                  >
                    Mark complete
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
