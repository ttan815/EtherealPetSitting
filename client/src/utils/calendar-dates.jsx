// Date helpers for the booking calendar. All dates are local dates at midnight.

const monthYearFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const shortDateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const weekdayDateFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });

/**
 * Gets the current local date with its time reset to midnight.
 * @returns {Date} Today's local calendar date at midnight.
 */
export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Adds a number of calendar days without changing the local time of day.
 * @param {Date} date - The date to move from.
 * @param {number} days - The number of days to add; negative values move backward.
 * @returns {Date} The resulting local calendar date.
 */
export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/**
 * Creates the first day of the month containing the given date.
 * @param {Date} date - A date in the target month.
 * @returns {Date} The month's first day at local midnight.
 */
export function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Moves to the first day of a month offset from the given date.
 * @param {Date} date - A date in the starting month.
 * @param {number} months - The number of months to move; negative values move backward.
 * @returns {Date} The first day of the resulting month at local midnight.
 */
export function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

// "2026-10-06": a stable key for a day, safe to keep in state or a URL
/**
 * Converts a local date to a stable YYYY-MM-DD calendar key.
 * @param {Date} date - The local date to format.
 * @returns {string} The date key.
 */
export function toDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Converts a YYYY-MM-DD calendar key into a local date.
 * @param {string} dateKey - The date key to parse.
 * @returns {Date} The corresponding local date at midnight.
 */
export function fromDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Full Monday-to-Sunday weeks covering the month, including the
// days from the months before and after that fill the first and last week
/**
 * Builds Monday-to-Sunday calendar weeks covering a month.
 * @param {Date} monthStart - A date in the month to lay out.
 * @returns {Date[][]} The calendar's rows of seven local dates.
 */
export function getCalendarWeeks(monthStart) {
  const daysFromMonday = (monthStart.getDay() + 6) % 7;
  let day = addDays(monthStart, -daysFromMonday);
  const weeks = [];

  do {
    const week = [];
    for (let weekday = 0; weekday < 7; weekday += 1) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  } while (day.getMonth() === monthStart.getMonth());

  return weeks;
}

// "October 2026"
/**
 * Formats a date as a month and year for a calendar heading.
 * @param {Date} date - The date to format.
 * @returns {string} The localized month and year.
 */
export function formatMonthYear(date) {
  return monthYearFormat.format(date);
}

// "Tue, Oct 6"
/**
 * Formats a date with its abbreviated weekday, month, and day.
 * @param {Date} date - The date to format.
 * @returns {string} The localized weekday and date.
 */
export function formatWeekdayDate(date) {
  return weekdayDateFormat.format(date);
}

// "Oct 30 – Nov 12"
/**
 * Formats the start and end dates of a date range.
 * @param {Date} start - The first date in the range.
 * @param {Date} end - The last date in the range.
 * @returns {string} The localized date range.
 */
export function formatDateRange(start, end) {
  return `${shortDateFormat.format(start)} – ${shortDateFormat.format(end)}`;
}
