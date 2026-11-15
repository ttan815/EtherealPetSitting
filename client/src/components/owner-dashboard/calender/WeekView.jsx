import { useEffect, useState } from "react";
import EventBlock from "./EventBlock";
import { getEvent } from "./getEvent";
import { CALENDAR_END_HOUR, CALENDAR_HOUR_HEIGHT, CALENDAR_HOURS, CALENDAR_START_HOUR } from "../../../constants/owner/calender/calendar";
import { filterCalendarEvents, formatCalendarHour, getMonday } from "../../../services/owner-dashboard/calender/calendar-service";
import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Renders the selected week's calendar events and timeline.
 * @param {Object} props Calendar configuration
 * @returns {JSX.Element} Rendered week calendar
 */
export default function WeekView({
  selectedDate,
  sitterId = "all",
  refreshKey = 0
}) {
  const [events, setEvents] = useState([]);

  const monday = getMonday(selectedDate);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      const results = await Promise.all(
        days.map((date) => getEvent(date))
      );

      if (active) {
        setEvents(
          filterCalendarEvents(results.flat(), sitterId)
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

  const isToday = (date) =>
    date.toDateString() === today.toDateString();

  const currentTimeVisible =
    today >= days[0] &&
    today <= new Date(
      days[6].getFullYear(),
      days[6].getMonth(),
      days[6].getDate(),
      23, 59, 59
    );

  const currentTop =
    ((today.getHours() - CALENDAR_START_HOUR) +
      today.getMinutes() / 60) * CALENDAR_HOUR_HEIGHT;

  const showCurrentLine =
    currentTimeVisible &&
    today.getHours() >= CALENDAR_START_HOUR &&
    today.getHours() < CALENDAR_END_HOUR;

  return (
    <div className="week-calendar">

      <div className="week-calendar-header">

        <div className="week-time-header" />

        {days.map((date) => (
          <div
            key={date.toISOString()}
            className="week-day-header"
          >
            <span>
              {date.toLocaleDateString("en-US", {
                weekday: "short"
              })}
            </span>

            <span
              className={
                isToday(date)
                  ? "week-day-number today"
                  : "week-day-number"
              }
            >
              {date.getDate()}
            </span>
          </div>
        ))}

      </div>

      <div className="week-calendar-body">

        <div className="week-time-axis">
          {CALENDAR_HOURS.map((hour) => (
            <div
              key={hour}
              className="week-time-label"
              style={{ height: CALENDAR_HOUR_HEIGHT }}
            >
              {formatCalendarHour(hour)}
            </div>
          ))}
        </div>

        <div className="week-days-grid">

          {days.map((date) => {
            const dayEvents = events.filter(
              (event) =>
                new Date(event.date).toDateString() ===
                date.toDateString()
            );

            return (
              <div
                key={date.toISOString()}
                className={`week-day-column ${
                  isToday(date) ? "current-day" : ""
                }`}
              >

                {CALENDAR_HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="week-hour-cell"
                    style={{ height: CALENDAR_HOUR_HEIGHT }}
                  />
                ))}

                {dayEvents.map((event) => (
                  <EventBlock
                    key={event.id}
                    event={event}
                    view="week"
                    startHour={CALENDAR_START_HOUR}
                    hourHeight={CALENDAR_HOUR_HEIGHT}
                  />
                ))}

                {showCurrentLine && isToday(date) && (
                  <div
                    className="current-time-indicator"
                    style={{ top: currentTop }}
                  >
                    <span />
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}