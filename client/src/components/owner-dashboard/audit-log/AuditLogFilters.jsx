// search box and dropdown filters for the audit log
import { Search } from "lucide-react";
import {
    AUDIT_LOG_AREA_OPTIONS,
    AUDIT_LOG_RANGE_OPTIONS,
} from "../../../constants/owner/audit-log";
import { getAuditLogPeopleOptions } from "../../../services/owner-dashboard/audit-log-service";
import "../../../styles/owner-dashboard/audit-log/AuditLog.css";

/**
 * Renders one dropdown filter.
 * @param {string} label Name read out by screen readers.
 * @param {string} value The selected value.
 * @param {Array} options The { value, label } choices.
 * @param {Function} onChange Called with the new value.
 * @returns {JSX.Element} The dropdown.
 */
function FilterSelect({ label, value, options, onChange }) {
    // TODO: reusable select dropdown component not available
    return (
        <select className="al-select" aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

/**
 * Renders the search box and the person, area, and date range filters.
 * @param {Object} filters The current { search, person, area, range } filters.
 * @param {Function} onChange Called with the updated filters object.
 * @returns {JSX.Element} The filter bar.
 */
export default function AuditLogFilters({ filters, onChange }) {
    const peopleOptions = getAuditLogPeopleOptions();
    function update(field, value) {
        onChange({ ...filters, [field]: value });
    }

    return (
        <div className="al-filters">
            <label className="al-search">
                <Search size={16} strokeWidth={1.75} aria-hidden="true" />
                <input
                    type="search"
                    placeholder="Search activity"
                    aria-label="Search activity"
                    value={filters.search}
                    onChange={(e) => update("search", e.target.value)}
                />
            </label>
            <FilterSelect label="Person" value={filters.person} options={peopleOptions} onChange={(v) => update("person", v)} />
            <FilterSelect label="Area" value={filters.area} options={AUDIT_LOG_AREA_OPTIONS} onChange={(v) => update("area", v)} />
            <FilterSelect label="Date range" value={filters.range} options={AUDIT_LOG_RANGE_OPTIONS} onChange={(v) => update("range", v)} />
        </div>
    );
}
