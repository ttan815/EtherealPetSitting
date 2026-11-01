// Renders the available times component.
import { formatTime } from "../../../utils/format-time";
import { formatWeekdayDate } from "../../../utils/calendar-dates";
import "../../../styles/booking/AvailableTimes.css";

// "Available Times" panel on booking step 2. Only open times are shown.
// selectedDate: Date, or null before a day is picked
// timeGroups: [{ id, label, times }] with times in minutes after midnight; empty groups are left out
/**
 * Renders grouped appointment start times for a selected date.
 * @param {Object} props - Selected date, available times, and selection state.
 * @param {Date|string} props.selectedDate - The date whose times are displayed.
 * @param {string} props.sitterLabel - The selected sitter label shown with the times.
 * @param {Array<Object>} props.timeGroups - Groups of available times for display.
 * @param {number|string|null} props.selectedTime - The currently selected start time.
 * @param {Function} props.onSelectTime - Called with the chosen start time.
 * @returns {JSX.Element} The available time choices.
 */
function AvailableTimes({ selectedDate, sitterLabel, timeGroups, selectedTime, onSelectTime }) {
  return (
    <section className="booking-panel available-times" aria-labelledby="available-times-title">
      <h2 id="available-times-title" className="booking-panel-title">
        Available Times
      </h2>

      {selectedDate ? (
        <>
          <p className="available-times-summary">
            Selected Date: {formatWeekdayDate(selectedDate)} &nbsp;·&nbsp; Sitter: {sitterLabel}
          </p>

          {timeGroups.map((group) => (
            <div key={group.id} className="available-times-group" role="group" aria-labelledby={`times-${group.id}`}>
              <p id={`times-${group.id}`} className="available-times-group-label">
                {group.label}
              </p>
              <div className="available-times-slots">
                {group.times.map((time) => {
                  const isSelected = time === selectedTime;
                  return (
                    <button
                      key={time}
                      type="button"
                      className={`available-times-slot ${isSelected ? "is-selected" : ""}`.trim()}
                      aria-pressed={isSelected}
                      onClick={() => onSelectTime(time)}
                    >
                      {formatTime(time)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="available-times-summary">Pick a highlighted day on the calendar to see open times.</p>
      )}
    </section>
  );
}

export default AvailableTimes;
