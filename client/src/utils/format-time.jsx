// 540 -> "9:00 AM", 930 -> "3:30 PM" (minutes after midnight)
/**
 * Formats a time expressed as minutes after midnight for display.
 * @param {number} minutes - Minutes after midnight.
 * @returns {string} The time in 12-hour format with an AM/PM suffix.
 */
export function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const period = hours < 12 ? "AM" : "PM";
  const displayHour = hours % 12 || 12;
  const displayMinutes = String(minutes % 60).padStart(2, "0");
  return `${displayHour}:${displayMinutes} ${period}`;
}
