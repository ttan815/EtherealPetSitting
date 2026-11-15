// Renders the time picker component.
import { useEffect, useState } from "react";
import { getEmployeesWithAvailability } from "../../../../services/owner-dashboard/availability-service";
import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Renders availability choices for the selected replacement date.
 * @param {Object} props - Selected date and availability-selection callback.
 * @param {Date|string} props.selectedDate - The date for which to show available times.
 * @param {Function} props.onAvailabilitySelect - Called with the selected employee and time.
 * @returns {JSX.Element} The available replacement-time choices.
 */
function TimePicker({ selectedDate, onAvailabilitySelect }) {
  const [employees, setEmployees] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(selectedDate);
  const selectedDateKey = formatDateKey(selectedDate);

  function getTimesForSelectedDate(employee) {
    return employee.availability.find(
      (availability) => availability.date === selectedDateKey,
    )?.times ?? [];
  }

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadAvailability() {
      setIsLoading(true);
      setError("");

      try {
        const availableEmployees = await getEmployeesWithAvailability(formatDateKey(selectedDate));
        if (isCurrentRequest) setEmployees(availableEmployees);
      } catch {
        if (isCurrentRequest) {
          setError("Couldn't load employee availability. Please try again.");
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    }

    loadAvailability();

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedDate]);

  function handleTimeSelect(employee, time) {
    const selection = {
      employeeId: employee.id,
      employeeName: employee.name,
      date: selectedDateKey,
      time,
    };
    setSelectedSlot({ employeeId: employee.id, time, date: selectedDateKey });
    onAvailabilitySelect(selection);
  }

  return (
    <div className="time-picker-block">
      <div className="available-times">Pet Sitter Employees</div>
      <div className="selected-date-tue-oct-6">Availability for {formattedDate}</div>

      {isLoading && (
        <p className="employee-availability-message" role="status">
          Loading employee availability…
        </p>
      )}
      {error && (
        <p className="employee-availability-message employee-availability-message--error" role="alert">
          {error}
        </p>
      )}
      {!isLoading && !error && employees.length === 0 && (
        <p className="employee-availability-message">
          No employees are available on this date.
        </p>
      )}

      {!isLoading && !error && employees.map((employee) => (
        <section className="employee-availability" key={employee.id}>
          <h3 className="employee-availability__name">{employee.name}</h3>
          {getTimesForSelectedDate(employee).length > 0 ? (
            <div className="employee-availability__times">
              {getTimesForSelectedDate(employee).map((time) => {
                const isSelected =
                  selectedSlot?.employeeId === employee.id &&
                  selectedSlot.time === time &&
                  selectedSlot.date === selectedDateKey;

                return (
                  <button
                    key={time}
                    type="button"
                    className={`employee-availability__time${isSelected ? " employee-availability__time--selected" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => handleTimeSelect(employee, time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="employee-availability-message">
              No available times for this employee.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}

export default TimePicker;
