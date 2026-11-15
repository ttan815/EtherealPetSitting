import React, { useEffect, useState } from "react";
import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Fetches calendar events for a date range and optional sitter.
 * @param {Object} range Date range containing start and end dates
 * @param {string} sitterId Selected sitter ID
 * @returns {Promise<Array>} Calendar events
 */
export async function getCalendarEvents(range, sitterId = "all") {
  const { getEvent } = await import("./getEvent");
  const dates = [];
  const current = new Date(range.start);

  while (current <= new Date(range.end)) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const results = await Promise.all(
    dates.map((date) => getEvent(date))
  );

  return results.flat().filter((event) => {
    return (
      sitterId === "all" ||
      event.sitterId === sitterId
    );
  });
}

/**
 * Fetches available sitters.
 * @param {string} sitterId Selected sitter ID
 * @returns {Promise<Array>} Available sitters
 */
export async function getSitters(sitterId = "all") {
  const sitters = [
    { id: "all", name: "All sitters" },
    { id: "me", name: "You" },
    { id: "adrian", name: "Adrian" }
  ];

  if (sitterId === "all") return sitters;

  return sitters.filter((sitter) => sitter.id === sitterId);
}

/**
 * Updates the selected calendar view.
 * @param {string} view Selected calendar view
 * @returns {string} Current view
 */
export function getCurrentView(view) {
  return view;
}

/**
 * Formats the date displayed in the toolbar.
 * @param {Date} date Selected date
 * @param {string} view Selected view
 * @returns {string} Formatted date
 */
function formatDate(date, view) {
  if (view === "day") {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  if (view === "month") {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  }

  const start = new Date(date);
  const day = start.getDay();

  start.setDate(start.getDate() - day + 1);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const format = (d) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

  return `${format(start)} – ${format(end)}, ${end.getFullYear()}`;
}

/**
 * Calendar toolbar component.
 * @param {Object} props Toolbar configuration and callbacks
 * @returns {JSX.Element} Calendar toolbar
 */
export default function CalendarBarUI({
  selectedDate,
  setSelectedDate,
  view,
  setView,
  sitterId,
  setSitterId
}) {
  const [sitters, setSitters] = useState([]);

  useEffect(() => {
    async function loadSitters() {
      const result = await getSitters();
      setSitters(result);
    }

    loadSitters();
  }, []);

  /**
   * Changes the selected date.
   * @param {number} amount Number of date units
   * @returns {void} Nothing
   */
  const changeDate = (amount) => {
    const next = new Date(selectedDate);

    if (view === "day") {
      next.setDate(next.getDate() + amount);
    } else if (view === "week") {
      next.setDate(next.getDate() + amount * 7);
    } else {
      next.setMonth(next.getMonth() + amount);
    }

    setSelectedDate(next);
  };

  /**
   * Changes the calendar view.
   * @param {string} nextView New calendar view
   * @returns {void} Nothing
   */
  const changeView = (nextView) => {
    setView(getCurrentView(nextView));
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
          {formatDate(selectedDate, view)}
        </div>

      </div>

      <div className="calendar-toolbar-right">

        <select
          className="calendar-sitter-select"
          value={sitterId}
          onChange={(e) => setSitterId(e.target.value)}
        >
          {sitters.map((sitter) => (
            <option key={sitter.id} value={sitter.id}>
              {sitter.name}
            </option>
          ))}
        </select>

        <div className="calendar-view-toggle">

          {["day", "week", "month"].map((item) => (
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