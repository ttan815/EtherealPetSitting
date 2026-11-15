import { useEffect, useState } from "react";
import EventBlock from "./EventBlock";
import { getEvent } from "./getEvent";
import { CALENDAR_END_HOUR, CALENDAR_HOUR_HEIGHT, CALENDAR_HOURS, CALENDAR_START_HOUR } from "../../../constants/owner/calender/calendar";
import { filterCalendarEvents, formatCalendarHour } from "../../../services/owner-dashboard/calender/calendar-service";
import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Renders the selected day's calendar events and timeline.
 * @param {Object} props Calendar configuration
 * @returns {JSX.Element} Rendered day calendar
 */
export default function DayView({
  selectedDate,
  sitterId = "all",
  refreshKey = 0
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      const result = await getEvent(selectedDate);

      if (active) {
        setEvents(
          filterCalendarEvents(result, sitterId)
        );
      }
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, [
    selectedDate.getTime(),
    sitterId,
    refreshKey
  ]);

  const today = new Date();

  const isToday =
    selectedDate.toDateString() === today.toDateString();

  const currentTop =
    ((today.getHours() - CALENDAR_START_HOUR) +
      today.getMinutes() / 60) * CALENDAR_HOUR_HEIGHT;

  const showCurrentLine =
    isToday &&
    today.getHours() >= CALENDAR_START_HOUR &&
    today.getHours() < CALENDAR_END_HOUR;

  return (
    <div className="day-calendar">

      <div className="day-calendar-header">

        <div className="day-date-heading">
          <span>
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "short"
            })}
          </span>

          <span className="day-date-number">
            {selectedDate.getDate()}
          </span>
        </div>

      </div>

      <div className="day-calendar-body">

        <div className="day-time-axis">
          {CALENDAR_HOURS.map((hour) => (
            <div
              key={hour}
              className="day-time-label"
              style={{ height: CALENDAR_HOUR_HEIGHT }}
            >
              {formatCalendarHour(hour)}
            </div>
          ))}
        </div>

        <div className="day-timeline">

          {CALENDAR_HOURS.map((hour) => (
            <div
              key={hour}
              className="day-hour-cell"
              style={{ height: CALENDAR_HOUR_HEIGHT }}
            />
          ))}

          {events.map((event) => (
            <EventBlock
              key={event.id}
              event={event}
              view="day"
              startHour={CALENDAR_START_HOUR}
              hourHeight={CALENDAR_HOUR_HEIGHT}
            />
          ))}

          {showCurrentLine && (
            <div
              className="current-time-indicator"
              style={{ top: currentTop }}
            >
              <span />
            </div>
          )}

        </div>

      </div>

      <div className="day-calendar-legend">

        <div>
          <span className="legend-dark" />
          Your visits
        </div>

        <div>
          <span className="legend-light" />
          Adrian's visits
        </div>

      </div>

    </div>
  );
}
