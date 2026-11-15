import React, { useEffect, useState } from "react";
import EventBlock from "./EventBlock";
import { getEvent } from "./getEvent";
import "../../../styles/owner-dashboard/calender/Calender.css";

const START_HOUR = 8;
const END_HOUR = 20;
const HOUR_HEIGHT = 53;

const HOURS = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, i) => START_HOUR + i
);

/**
 * Formats an hour into a readable time.
 * @param {number} hour Hour in 24-hour format
 * @returns {string} Formatted hour
 */
function formatHour(hour) {
  return `${hour % 12 || 12} ${hour >= 12 ? "PM" : "AM"}`;
}

/**
 * Single-day calendar view.
 * @param {Object} props Calendar configuration
 * @returns {JSX.Element} Day calendar
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
          result.filter((event) =>
            sitterId === "all" ||
            event.sitterId === sitterId
          )
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
    ((today.getHours() - START_HOUR) +
      today.getMinutes() / 60) * HOUR_HEIGHT;

  const showCurrentLine =
    isToday &&
    today.getHours() >= START_HOUR &&
    today.getHours() < END_HOUR;

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
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="day-time-label"
              style={{ height: HOUR_HEIGHT }}
            >
              {formatHour(hour)}
            </div>
          ))}
        </div>

        <div className="day-timeline">

          {HOURS.map((hour) => (
            <div
              key={hour}
              className="day-hour-cell"
              style={{ height: HOUR_HEIGHT }}
            />
          ))}

          {events.map((event) => (
            <EventBlock
              key={event.id}
              event={event}
              view="day"
              startHour={START_HOUR}
              hourHeight={HOUR_HEIGHT}
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
