import { CALENDAR_VIEWS } from "../../../constants/owner/calendar";
import {
  formatCalendarDate,
  getAdjacentCalendarDate,
  getSitters
} from "../../../services/owner-dashboard/calendar-service";
import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Renders the calendar toolbar and its date, sitter, and view controls.
 * @param {Object} props Toolbar configuration and callbacks
 * @returns {JSX.Element} Rendered calendar toolbar
 */
export default function CalendarBarUI({
  selectedDate,
  setSelectedDate,
  view,
  setView,
  sitterId,
  setSitterId
}) {
  /**
   * Changes the selected date.
   * @param {number} amount Number of date units
   * @returns {void} Nothing
   */
  const changeDate = (amount) => {
    setSelectedDate(getAdjacentCalendarDate(selectedDate, view, amount));
  };

  /**
   * Changes the calendar view.
   * @param {string} nextView New calendar view
   * @returns {void} Nothing
   */
  const changeView = (nextView) => {
    setView(nextView);
  };

  return (
    <div className="calendar-toolbar">

      <div className="calendar-toolbar-left">

        <div className="calendar-navigation">

          <button
            className="calendar-nav-button"
            onClick={() => changeDate(-1)}
            aria-label="Previous date"
          >
            ‹
          </button>

          <button
            className="calendar-nav-button"
            onClick={() => changeDate(1)}
            aria-label="Next date"
          >
            ›
          </button>

          <button
            className="calendar-today-button"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </button>

        </div>

        <div className="calendar-current-date">
          {formatCalendarDate(selectedDate, view)}
        </div>

      </div>

      <div className="calendar-toolbar-right">

        <select
          className="calendar-sitter-select"
          value={sitterId}
          onChange={(e) => setSitterId(e.target.value)}
        >
          {getSitters().map((sitter) => (
            <option key={sitter.id} value={sitter.id}>
              {sitter.name}
            </option>
          ))}
        </select>

        <div className="calendar-view-toggle">

          {CALENDAR_VIEWS.map((item) => (
            <button
              key={item}
              className={
                view === item ? "active" : ""
              }
              onClick={() => changeView(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}