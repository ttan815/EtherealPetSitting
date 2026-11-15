
import { MOCK_EVENTS } from "../../../constants/owner/calender/calendar";

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