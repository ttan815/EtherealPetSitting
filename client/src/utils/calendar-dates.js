// Date helpers for the booking calendar. All dates are local dates at midnight.

const monthYearFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const shortDateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const weekdayDateFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });

export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

// "2026-10-06": a stable key for a day, safe to keep in state or a URL
export function toDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Full Monday-to-Sunday weeks covering the month, including the
// days from the months before and after that fill the first and last week
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
export function formatMonthYear(date) {
  return monthYearFormat.format(date);
}

// "Tue, Oct 6"
export function formatWeekdayDate(date) {
  return weekdayDateFormat.format(date);
}

// "Oct 30 – Nov 12"
export function formatDateRange(start, end) {
  return `${shortDateFormat.format(start)} – ${shortDateFormat.format(end)}`;
}
