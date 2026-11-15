import { CALENDAR_SITTERS, MOCK_EVENTS } from "../../constants/owner/calendar";

/**
 * Returns the Monday of the selected week.
 * @param {Date} date Selected date
 * @returns {Date} Monday of the selected week
 */
export function getMonday(date) {
  const result = new Date(date);
  const day = result.getDay();

  result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));
  result.setHours(0, 0, 0, 0);

  return result;
}

/**
 * Fetches calendar events for a specific date.
 * @param {Date|string} date Selected date
 * @returns {Promise<Array>} Calendar events for the selected date
 */
export async function getEvent(date) {
  // TODO: Replace with backend API fetch().
  // Example: GET /api/calendar/events?date=YYYY-MM-DD

  const selectedDate = new Date(date);

  const formattedDate = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, "0"),
    String(selectedDate.getDate()).padStart(2, "0")
  ].join("-");

  return MOCK_EVENTS.filter(
    (event) => event.date === formattedDate
  );
}

/**
 * Returns all dates required for the month grid.
 * @param {Date} date Selected month
 * @returns {Array<Date>} Calendar grid dates
 */
export function getMonthDates(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - startDay);

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return current;
  });
}

/**
 * Formats the date displayed in the calendar toolbar.
 * @param {Date} date Selected date
 * @param {string} view Selected view
 * @returns {string} Formatted date
 */
export function formatCalendarDate(date, view) {
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
  const format = (value) => value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  return `${format(start)} – ${format(end)}, ${end.getFullYear()}`;
}

/**
 * Formats a 24-hour value as a readable calendar time.
 * @param {number} hour Hour in 24-hour format
 * @returns {string} Formatted hour
 */
export function formatCalendarHour(hour) {
  return `${hour % 12 || 12} ${hour >= 12 ? "PM" : "AM"}`;
}

/**
 * Returns events matching a selected sitter.
 * @param {Array} events Calendar events
 * @param {string} sitterId Selected sitter ID, or "all"
 * @returns {Array} Filtered events
 */
export function filterCalendarEvents(events, sitterId = "all") {
  return events.filter((event) =>
    sitterId === "all" || event.sitterId === sitterId
  );
}

/**
 * Returns the date shifted by the selected calendar view's unit.
 * @param {Date} date Currently selected calendar date
 * @param {string} view Selected calendar view
 * @param {number} amount Number of units to shift
 * @returns {Date} Shifted calendar date
 */
export function getAdjacentCalendarDate(date, view, amount) {
  const nextDate = new Date(date);

  if (view === "day") {
    nextDate.setDate(nextDate.getDate() + amount);
  } else if (view === "week") {
    nextDate.setDate(nextDate.getDate() + amount * 7);
  } else {
    nextDate.setMonth(nextDate.getMonth() + amount);
  }

  return nextDate;
}

/**
 * Fetches events within a date range and filters by sitter.
 * @param {Object} range Inclusive start and end dates
 * @param {string} sitterId Selected sitter ID, or "all"
 * @returns {Promise<Array>} Matching calendar events
 */
export async function getCalendarEvents(range, sitterId = "all") {
  const dates = [];
  const current = new Date(range.start);
  const end = new Date(range.end);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const results = await Promise.all(dates.map((date) => getEvent(date)));
  return filterCalendarEvents(results.flat(), sitterId);
}

/**
 * Returns sitters matching the selected sitter ID.
 * @param {string} sitterId Selected sitter ID, or "all"
 * @returns {Array} Matching calendar sitters
 */
export function getSitters(sitterId = "all") {
  if (sitterId === "all") return CALENDAR_SITTERS;
  return CALENDAR_SITTERS.filter((sitter) => sitter.id === sitterId);
}