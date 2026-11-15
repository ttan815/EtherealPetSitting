import { useEffect, useState } from "react";
import EventBlock from "./EventBlock";
import { CALENDAR_WEEKDAY_LABELS } from "../../../constants/owner/calendar";
import { filterCalendarEvents, getMonthDates, getEvent } from "../../../services/owner-dashboard/calendar-service";
import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Renders the selected month's events and provides navigation to day view.
 * @param {Object} props Calendar configuration and callbacks
 * @returns {JSX.Element} Rendered month calendar
 */
export default function MonthView({
  selectedDate,
  setSelectedDate,
  setView,
  sitterId = "all",
  refreshKey = 0
}) {
  const [events, setEvents] = useState([]);

  const dates = getMonthDates(selectedDate);

  useEffect(() => {
    let active = true;

    async function loadMonthEvents() {
      const results = await Promise.all(
        dates.map((date) => getEvent(date))
      );

      if (active) {
        setEvents(
          filterCalendarEvents(results.flat(), sitterId)
        );
      }
    }

    loadMonthEvents();

    return () => {
      active = false;
    };
  }, [
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    sitterId,
    refreshKey
  ]);

  const today = new Date();

  const getDayEvents = (date) =>
    events.filter(
      (event) =>
        new Date(event.date).toDateString() ===
        date.toDateString()
    );

  /**
   * Opens the selected date in Day View.
   * @param {Date} date Selected calendar date
   * @returns {void} Nothing
   */
  const openDay = (date) => {
    setSelectedDate(new Date(date));
    setView("day");
  };

  return (
    <div className="month-calendar">

      <div className="month-weekdays">
        {CALENDAR_WEEKDAY_LABELS.map(
          (day) => (
            <div key={day}>{day}</div>
          )
        )}
      </div>

      <div className="month-grid">

        {dates.map((date) => {
          const dayEvents = getDayEvents(date);

          const isCurrentMonth =
            date.getMonth() === selectedDate.getMonth();

          const isToday =
            date.toDateString() === today.toDateString();

          const isClosed = date.getDay() === 0;

          const visibleEvents = dayEvents.slice(0, 3);
          const remaining = dayEvents.length - visibleEvents.length;

          return (
            <div
              key={date.toISOString()}
              className={`month-day ${
                !isCurrentMonth ? "outside-month" : ""
              } ${isClosed ? "closed-day" : ""}`}
              onClick={() => openDay(date)}
            >

              <div className="month-day-number">
                <span className={isToday ? "today" : ""}>
                  {date.getDate()}
                </span>
              </div>

              {isClosed ? (
                <div className="month-closed-label">
                  Closed
                </div>
              ) : (
                <>
                  <div className="month-events">
                    {visibleEvents.map((event) => (
                      <EventBlock
                        key={event.id}
                        event={event}
                        view="month"
                      />
                    ))}
                  </div>

                  {remaining > 0 && (
                    <div className="month-more">
                      +{remaining} more
                    </div>
                  )}
                </>
              )}

            </div>
          );
        })}

      </div>

      <div className="month-legend">

        <div>
          <span className="legend-dark" />
          Your visits
        </div>

        <div>
          <span className="legend-light" />
          Adrian's visits
        </div>

        <div>
          <span className="legend-closed" />
          Closed
        </div>

      </div>

    </div>
  );
}