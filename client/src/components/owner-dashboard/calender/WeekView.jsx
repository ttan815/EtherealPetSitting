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
 * Returns the Monday of the selected week.
 * @param {Date} date Selected date
 * @returns {Date} Monday of the selected week
 */
function getMonday(date) {
  const result = new Date(date);
  const day = result.getDay();

  result.setDate(
    result.getDate() - (day === 0 ? 6 : day - 1)
  );

  result.setHours(0, 0, 0, 0);

  return result;
}

/**
 * Formats an hour into a calendar time label.
 * @param {number} hour Hour in 24-hour format
 * @returns {string} Formatted hour
 */
function formatHour(hour) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;

  return `${display} ${suffix}`;
}

/**
 * Weekly calendar view.
 * @param {Object} props Calendar configuration
 * @returns {JSX.Element} Weekly calendar
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
          results.flat().filter((event) =>
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
    ((today.getHours() - START_HOUR) +
      today.getMinutes() / 60) * HOUR_HEIGHT;

  const showCurrentLine =
    currentTimeVisible &&
    today.getHours() >= START_HOUR &&
    today.getHours() < END_HOUR;

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
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="week-time-label"
              style={{ height: HOUR_HEIGHT }}
            >
              {formatHour(hour)}
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

                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="week-hour-cell"
                    style={{ height: HOUR_HEIGHT }}
                  />
                ))}

                {dayEvents.map((event) => (
                  <EventBlock
                    key={event.id}
                    event={event}
                    view="week"
                    startHour={START_HOUR}
                    hourHeight={HOUR_HEIGHT}
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