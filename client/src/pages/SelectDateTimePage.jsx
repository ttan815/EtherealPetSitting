// Renders the select date time page page.
import { useState } from "react";
import BookingLayout from "../components/booking/select-service/BookingLayout";
import SelectedServiceBanner from "../components/booking/availability/SelectedServiceBanner";
import AvailabilityFilters from "../components/booking/availability/AvailabilityFilters";
import SitterPicker from "../components/booking/availability/SitterPicker";
import AvailabilityCalendar from "../components/booking/availability/AvailabilityCalendar";
import AvailableTimes from "../components/booking/availability/AvailableTimes";
import Button from "../components/form/Button";
import { NO_PREFERENCE_SITTER_ID } from "../constants/booking/booking-sitters";
import {
  DATE_RANGE_OPTIONS,
  DEFAULT_AVAILABILITY_FILTERS,
  TIME_OF_DAY_GROUPS,
  TIME_OF_DAY_OPTIONS,
} from "../constants/booking/booking-filters";
import {
  addDays,
  addMonths,
  formatDateRange,
  fromDateKey,
  getStartOfMonth,
  getToday,
} from "../utils/calendar-dates";
import { getAvailableTimes } from "../services/owner-dashboard/availability-service";
import { getBookingServices, getBookingSitters } from "../services/booking/booking-service";
import "../styles/booking/SelectDateTimePage.css";

// Bookable days for a Date dropdown choice: starts tomorrow, lasts `days` days
function getDateRange(dateRangeOption) {
  const start = addDays(getToday(), 1);
  return { start, end: addDays(start, dateRangeOption.days - 1) };
}

function isTimeInPartOfDay(time, partOfDay) {
  return partOfDay.id === "any" || (time >= partOfDay.startMinutes && time < partOfDay.endMinutes);
}

// Step 2 of booking: pick a sitter, a day and a time
// (Figma "Customer - Select Date & Time (with filters & sitter)").
// The sitter, day and time are saved in the booking; the date range and time-of-day filters only live here.
/**
 * Renders the date-and-time selection step of the booking flow.
 * @param {{booking: Object, updateBooking: Function, onBack: Function, onContinue: Function}} props - Booking data and step controls.
 * @returns {JSX.Element} The booking date-and-time page.
 */
export default function SelectDateTimePage({ booking, updateBooking, onBack, onContinue }) {
  const [filters, setFilters] = useState(DEFAULT_AVAILABILITY_FILTERS);
  const [shownMonth, setShownMonth] = useState(null); // null = first month of the date range
  const bookingServices = getBookingServices();
  const bookingSitters = getBookingSitters();

  const services = bookingServices.filter((service) => booking.serviceIds.includes(service.id));

  // Only sitters who offer every picked service can be chosen
  const sitters = bookingSitters.filter(
    (sitter) => !sitter.serviceIds || booking.serviceIds.every((serviceId) => sitter.serviceIds.includes(serviceId))
  );
  // Falls back to "No preference" if the services changed and the saved sitter no longer fits
  const selectedSitter = sitters.find((sitter) => sitter.id === booking.sitterId) ?? sitters[0];
  const isNoPreference = selectedSitter.id === NO_PREFERENCE_SITTER_ID;
  const scheduleSitterIds = isNoPreference
    ? sitters.filter((sitter) => sitter.id !== NO_PREFERENCE_SITTER_ID).map((sitter) => sitter.id)
    : [selectedSitter.id];

  const dateRangeOption = DATE_RANGE_OPTIONS.find((option) => option.id === filters.dateRangeId);
  const dateRange = getDateRange(dateRangeOption);
  const partOfDay = TIME_OF_DAY_OPTIONS.find((option) => option.id === filters.timeOfDayId);

  // Open times on a day after the filters are applied; empty outside the date range
  function getOpenTimes(date) {
    if (date < dateRange.start || date > dateRange.end) {
      return [];
    }
    return getAvailableTimes(date, scheduleSitterIds).filter((time) => isTimeInPartOfDay(time, partOfDay));
  }

  function isDateAvailable(date) {
    return getOpenTimes(date).length > 0;
  }

  // A picked day or time stops counting once a filter hides it
  const pickedDate = booking.dateKey ? fromDateKey(booking.dateKey) : null;
  const selectedDate = pickedDate && isDateAvailable(pickedDate) ? pickedDate : null;
  const openTimes = selectedDate ? getOpenTimes(selectedDate) : [];
  const selectedTime = openTimes.includes(booking.time) ? booking.time : null;
  const canContinue = selectedDate !== null && selectedTime !== null;

  const timeGroups = TIME_OF_DAY_GROUPS.map((group) => ({
    ...group,
    times: openTimes.filter((time) => isTimeInPartOfDay(time, group)),
  })).filter((group) => group.times.length > 0);

  // Keep the calendar on a month inside the date range
  const firstMonth = getStartOfMonth(dateRange.start);
  const lastMonth = getStartOfMonth(dateRange.end);
  let calendarMonth = shownMonth ?? firstMonth;
  if (calendarMonth < firstMonth) calendarMonth = firstMonth;
  if (calendarMonth > lastMonth) calendarMonth = lastMonth;

  const dateRangeOptions = DATE_RANGE_OPTIONS.map((option) => {
    const range = getDateRange(option);
    return { value: option.id, label: `${option.label} (${formatDateRange(range.start, range.end)})` };
  });
  const sitterOptions = sitters.map((sitter) => ({ value: sitter.id, label: sitter.shortName }));

  // The filter card edits the sitter too, so split it back out into the booking
  function changeFilters({ sitterId, ...nextFilters }) {
    setFilters(nextFilters);
    updateBooking({ sitterId });
  }

  function clearFilters() {
    setFilters(DEFAULT_AVAILABILITY_FILTERS);
    updateBooking({ sitterId: NO_PREFERENCE_SITTER_ID });
  }

  const actions = (
    <>
      <Button variant="outline" type="button" onClick={onBack}>
        Back
      </Button>
      <Button type="button" disabled={!canContinue} onClick={onContinue}>
        Continue to Pet Details
      </Button>
    </>
  );

  return (
    <BookingLayout
      currentStep={2}
      title="Select Date & Time"
      description="Choose your sitter, then pick a date and time. Use the filters to narrow down available slots."
      actions={actions}
    >
      <SelectedServiceBanner services={services} />

      <AvailabilityFilters
        filters={{ ...filters, sitterId: selectedSitter.id }}
        dateRangeOptions={dateRangeOptions}
        sitterOptions={sitterOptions}
        onChange={changeFilters}
        onClear={clearFilters}
      />

      <SitterPicker
        sitters={sitters}
        selectedSitterId={selectedSitter.id}
        onSelect={(sitterId) => updateBooking({ sitterId })}
      />

      <div className="select-date-time-columns">
        <AvailabilityCalendar
          month={calendarMonth}
          canGoToPreviousMonth={calendarMonth > firstMonth}
          canGoToNextMonth={calendarMonth < lastMonth}
          onMonthChange={(months) => setShownMonth(addMonths(calendarMonth, months))}
          isDateAvailable={isDateAvailable}
          selectedDateKey={selectedDate ? booking.dateKey : null}
          onSelectDate={(dateKey) => updateBooking({ dateKey, time: null })}
        />

        <AvailableTimes
          selectedDate={selectedDate}
          sitterLabel={isNoPreference ? "Any available" : selectedSitter.shortName}
          timeGroups={timeGroups}
          selectedTime={selectedTime}
          onSelectTime={(time) => updateBooking({ time })}
        />
      </div>
    </BookingLayout>
  );
}
