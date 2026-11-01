// Renders the availability calendar component.
import { formatMonthYear, formatWeekdayDate, getCalendarWeeks, toDateKey } from "../../../utils/calendar-dates";
import previousIcon from "../../../assets/booking/calendar-prev.svg";
import nextIcon from "../../../assets/booking/calendar-next.svg";
import "../../../styles/booking/AvailabilityCalendar.css";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Month calendar on booking step 2. Days with open times are tan buttons;
// every other day is plain text and can't be picked.
// month: first day of the month to show
// onMonthChange: called with -1 or 1
// isDateAvailable: (date) => true when the day has open times
/**
 * Renders the booking calendar with selectable dates that have open times.
 * @param {Object} props - Calendar month, selection, availability, and controls.
 * @param {Date} props.month - A date in the month being displayed.
 * @param {boolean} props.canGoToPreviousMonth - Whether the previous-month control is enabled.
 * @param {boolean} props.canGoToNextMonth - Whether the next-month control is enabled.
 * @param {Function} props.onMonthChange - Called with -1 or 1 when changing months.
 * @param {Function} props.isDateAvailable - Returns whether a date has open times.
 * @param {string|null} props.selectedDateKey - The selected date's YYYY-MM-DD key, if any.
 * @param {Function} props.onSelectDate - Called with the selected date key.
 * @returns {JSX.Element} The month calendar and its date controls.
 */
function AvailabilityCalendar({
  month,
  canGoToPreviousMonth,
  canGoToNextMonth,
  onMonthChange,
  isDateAvailable,
  selectedDateKey,
  onSelectDate,
}) {
  return (
    <section className="booking-panel availability-calendar" aria-labelledby="availability-calendar-title">
      <div className="availability-calendar-header">
        <h2 id="availability-calendar-title" className="booking-panel-title" aria-live="polite">
          {formatMonthYear(month)}
        </h2>
        <div className="availability-calendar-arrows">
          <button
            type="button"
            aria-label="Previous month"
            disabled={!canGoToPreviousMonth}
            onClick={() => onMonthChange(-1)}
          >
            <img src={previousIcon} alt="" />
          </button>
          <button type="button" aria-label="Next month" disabled={!canGoToNextMonth} onClick={() => onMonthChange(1)}>
            <img src={nextIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="availability-calendar-grid">
        {WEEKDAY_LABELS.map((weekday) => (
          <span key={weekday} className="availability-calendar-weekday" aria-hidden="true">
            {weekday}
          </span>
        ))}

        {getCalendarWeeks(month).flat().map((date) => {
          const dateKey = toDateKey(date);
          const isInMonth = date.getMonth() === month.getMonth();

          if (!isInMonth || !isDateAvailable(date)) {
            return (
              <span key={dateKey} className="availability-calendar-day">
                {date.getDate()}
              </span>
            );
          }

          const isSelected = dateKey === selectedDateKey;
          return (
            <button
              key={dateKey}
              type="button"
              className={`availability-calendar-day is-available ${isSelected ? "is-selected" : ""}`.trim()}
              aria-label={formatWeekdayDate(date)}
              aria-pressed={isSelected}
              onClick={() => onSelectDate(dateKey)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default AvailabilityCalendar;
