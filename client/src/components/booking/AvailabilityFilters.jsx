// Renders the availability filters component.
import { TIME_OF_DAY_OPTIONS } from "../../constants/booking-filters";
import chevronIcon from "../../assets/booking/select-chevron.svg";
import "../../styles/booking/AvailabilityFilters.css";

// Labeled dropdown styled like the Figma "Date Select" / "Sitter Select"
function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="availability-filters-field">
      <label htmlFor={id} className="availability-filters-label">
        {label}
      </label>
      <div className="availability-filters-select">
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <img src={chevronIcon} alt="" />
      </div>
    </div>
  );
}

// "Filter available times" card: date range, time of day and sitter.
// filters: { dateRangeId, timeOfDayId, sitterId }
// dateRangeOptions, sitterOptions: [{ value, label }] for the two dropdowns
// onChange: called with the whole updated filters object
/**
 * Renders controls for filtering available appointment dates and times.
 * @param {Object} props - Filter values, dropdown options, and change handlers.
 * @param {{dateRangeId: string, timeOfDayId: string, sitterId: string}} props.filters - Current filter selections.
 * @param {Array<{value: string, label: string}>} props.dateRangeOptions - Date-range dropdown choices.
 * @param {Array<{value: string, label: string}>} props.sitterOptions - Sitter dropdown choices.
 * @param {Function} props.onChange - Called with the complete updated filter object.
 * @param {Function} props.onClear - Called when the user clears all filters.
 * @returns {JSX.Element} The availability filter panel.
 */
function AvailabilityFilters({ filters, dateRangeOptions, sitterOptions, onChange, onClear }) {
  function updateFilter(name, value) {
    onChange({ ...filters, [name]: value });
  }

  return (
    <section className="booking-panel availability-filters" aria-labelledby="availability-filters-title">
      <div className="availability-filters-header">
        <h2 id="availability-filters-title" className="booking-panel-title">
          Filter available times
        </h2>
        <button type="button" className="availability-filters-clear" onClick={onClear}>
          Clear filters
        </button>
      </div>

      <div className="availability-filters-fields">
        <FilterSelect
          id="filter-date-range"
          label="Date"
          value={filters.dateRangeId}
          options={dateRangeOptions}
          onChange={(value) => updateFilter("dateRangeId", value)}
        />

        <div className="availability-filters-field availability-filters-time">
          <p id="filter-time-of-day" className="availability-filters-label">
            Time of day
          </p>
          <div className="availability-filters-chips" role="group" aria-labelledby="filter-time-of-day">
            {TIME_OF_DAY_OPTIONS.map((option) => {
              const isSelected = option.id === filters.timeOfDayId;
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`availability-chip ${isSelected ? "is-selected" : ""}`.trim()}
                  aria-pressed={isSelected}
                  onClick={() => updateFilter("timeOfDayId", option.id)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <FilterSelect
          id="filter-sitter"
          label="Sitter"
          value={filters.sitterId}
          options={sitterOptions}
          onChange={(value) => updateFilter("sitterId", value)}
        />
      </div>
    </section>
  );
}

export default AvailabilityFilters;
