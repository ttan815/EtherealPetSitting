// Time-of-day chips in "Filter available times". The three parts of the day
// also group the slots in the "Available Times" panel.
// startMinutes / endMinutes: minutes after midnight (end not included)
/**
 * Time-of-day choices used to filter booking availability.
 * @type {Array<Object>}
 */
export const TIME_OF_DAY_OPTIONS = [
  { id: "any", label: "Any time" },
  { id: "morning", label: "Morning", startMinutes: 0, endMinutes: 12 * 60 },
  { id: "afternoon", label: "Afternoon", startMinutes: 12 * 60, endMinutes: 17 * 60 },
  { id: "evening", label: "Evening", startMinutes: 17 * 60, endMinutes: 24 * 60 },
];

/** @type {Array<Object>} Time options excluding the unrestricted choice. */
export const TIME_OF_DAY_GROUPS = TIME_OF_DAY_OPTIONS.filter((option) => option.id !== "any");

// Date dropdown choices; each range starts tomorrow
/**
 * Date-range choices used to filter booking availability.
 * @type {Array<Object>}
 */
export const DATE_RANGE_OPTIONS = [
  { id: "next-7-days", label: "Next 7 days", days: 7 },
  { id: "next-14-days", label: "Next 2 weeks", days: 14 },
  { id: "next-30-days", label: "Next 30 days", days: 30 },
];

// What "Clear filters" goes back to (it also resets the sitter to "No preference")
/**
 * Default filters for the booking availability view.
 * @type {Object}
 */
export const DEFAULT_AVAILABILITY_FILTERS = {
  dateRangeId: "next-14-days",
  timeOfDayId: "any",
};
