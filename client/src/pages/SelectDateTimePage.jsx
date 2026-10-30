import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import BookingLayout from "../components/booking/BookingLayout";
import SelectedServiceBanner from "../components/booking/SelectedServiceBanner";
import AvailabilityFilters from "../components/booking/AvailabilityFilters";
import SitterPicker from "../components/booking/SitterPicker";
import AvailabilityCalendar from "../components/booking/AvailabilityCalendar";
import AvailableTimes from "../components/booking/AvailableTimes";
import Button from "../components/form/Button";
import { BOOKING_SERVICES } from "../constants/booking-services";
import { BOOKING_SITTERS, NO_PREFERENCE_SITTER_ID } from "../constants/booking-sitters";
import {
  DATE_RANGE_OPTIONS,
  DEFAULT_AVAILABILITY_FILTERS,
  TIME_OF_DAY_GROUPS,
  TIME_OF_DAY_OPTIONS,
} from "../constants/booking-filters";
import {
  addDays,
  addMonths,
  formatDateRange,
  fromDateKey,
  getStartOfMonth,
  getToday,
} from "../utils/calendar-dates";
import { getAvailableTimes } from "../utils/placeholder-availability";
import { getServiceIdsFromQuery, toServiceQuery } from "../utils/service-query";
import "../styles/SelectDateTimePage.css";

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
export default function SelectDateTimePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_AVAILABILITY_FILTERS);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [shownMonth, setShownMonth] = useState(null); // null = first month of the date range

  // Step 1 passes the services in the URL; without any there is nothing to book
  const serviceIds = getServiceIdsFromQuery(searchParams);
  if (serviceIds.length === 0) {
    return <Navigate to="/book-appointment" replace />;
  }
  const services = BOOKING_SERVICES.filter((service) => serviceIds.includes(service.id));

  // Only sitters who offer every picked service can be chosen
  const sitters = BOOKING_SITTERS.filter(
    (sitter) => !sitter.serviceIds || serviceIds.every((serviceId) => sitter.serviceIds.includes(serviceId))
  );
  const selectedSitter = sitters.find((sitter) => sitter.id === filters.sitterId);
  const isNoPreference = filters.sitterId === NO_PREFERENCE_SITTER_ID;
  const scheduleSitterIds = isNoPreference
    ? sitters.filter((sitter) => sitter.id !== NO_PREFERENCE_SITTER_ID).map((sitter) => sitter.id)
    : [filters.sitterId];

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
  const pickedDate = selectedDateKey ? fromDateKey(selectedDateKey) : null;
  const selectedDate = pickedDate && isDateAvailable(pickedDate) ? pickedDate : null;
  const openTimes = selectedDate ? getOpenTimes(selectedDate) : [];
  const activeTime = openTimes.includes(selectedTime) ? selectedTime : null;
  const canContinue = selectedDate !== null && activeTime !== null;

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

  function selectDate(dateKey) {
    setSelectedDateKey(dateKey);
    setSelectedTime(null);
  }

  // TODO (later ticket): go to step 3, Pet & Care Details, with the services, sitter, date and time
  function continueToPetDetails() {}

  const actions = (
    <>
      <Button variant="outline" type="button" onClick={() => navigate(`/book-appointment?${toServiceQuery(serviceIds)}`)}>
        Back
      </Button>
      <Button type="button" disabled={!canContinue} onClick={continueToPetDetails}>
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
        filters={filters}
        dateRangeOptions={dateRangeOptions}
        sitterOptions={sitterOptions}
        onChange={setFilters}
        onClear={() => setFilters(DEFAULT_AVAILABILITY_FILTERS)}
      />

      <SitterPicker
        sitters={sitters}
        selectedSitterId={filters.sitterId}
        onSelect={(sitterId) => setFilters({ ...filters, sitterId })}
      />

      <div className="select-date-time-columns">
        <AvailabilityCalendar
          month={calendarMonth}
          canGoToPreviousMonth={calendarMonth > firstMonth}
          canGoToNextMonth={calendarMonth < lastMonth}
          onMonthChange={(months) => setShownMonth(addMonths(calendarMonth, months))}
          isDateAvailable={isDateAvailable}
          selectedDateKey={selectedDate ? selectedDateKey : null}
          onSelectDate={selectDate}
        />

        <AvailableTimes
          selectedDate={selectedDate}
          sitterLabel={isNoPreference ? "Any available" : selectedSitter.shortName}
          timeGroups={timeGroups}
          selectedTime={activeTime}
          onSelectTime={setSelectedTime}
        />
      </div>
    </BookingLayout>
  );
}
