import { useState } from "react";
import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

function CalenderGrid( {calendarCells, visibleMonth} ) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return (
    <div className="date-picker-calendar-grid">
        {calendarCells.map((day, index) => {
          if (day === null) {
            return <span key={`empty-${index}`} aria-hidden="true" />;
          }

          const isSelected =
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day;
          const date = new Date(year, month, day);
          const isPastDate = date < todayStart;

          return (
            <button
              key={day}
              type="button"
              className={`date-picker-day${isSelected ? " date-picker-day--selected" : ""}${isPastDate ? " date-picker-day--disabled" : ""}`}
              disabled={isPastDate}
              aria-pressed={isSelected}
              onClick={() => {
                setSelectedDate(date);
                onDateChange(date);
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
  );
}

function DatePicker({ onDateChange }) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const monthLabel = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);

  // Fix Indexing (0-Sunday,...,6-Saturday)
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create a 1D Array of Calender Date
  // 1-firstWeekday: Null
  // firstWeekday-daysInMonth: 1-31/30/29/28
  const calendarCells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  function changeMonth(offset) {
    setVisibleMonth((currentMonth) =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1),
    );
  }

  return (
      <div className="date-picker-block">
        <div className="header-row-calendar">
          <div className="october-2026">{monthLabel}</div>
          <div className="pickers-controls">
            <button
              type="button"
              className="chevron-prev"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            >
              ‹
            </button>
            <button
              type="button"
              className="chevron-next"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            >
              ›
            </button>
          </div>
        </div>

      <div className="days-of-week-headers">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="date-picker-weekday">{day}</div>
        ))}
      </div>

      <CalenderGrid 
        calendarCells={calendarCells} 
        onDateChange={onDateChange}
        visibleMonth={visibleMonth}
      />
    </div>
  );
}

export default DatePicker;
