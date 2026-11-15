// Renders the status chips and search/dropdown filters for the owner's Availability section (DT-322).
import { AVAILABILITY_CHIPS } from "../../../constants/availability";

/**
 * Keeps only the slots that match the active chip and every filter.
 * @param {Array<Object>} slots All availability slots.
 * @param {string} activeChip The selected chip key, e.g. "requests".
 * @param {Object} filters The search text, admin and service filters.
 * @returns {Array<Object>} The matching slots.
 */
export function filterAvailability(slots, activeChip, filters) {
    const chip = AVAILABILITY_CHIPS.find((c) => c.key === activeChip);
    const search = filters.search.trim().toLowerCase();

    return slots.filter((slot) =>
        (!chip?.status || slot.status === chip.status) &&
        (!search || slot.admin.toLowerCase().includes(search)) &&
        (filters.admin === "all" || slot.admin === filters.admin) &&
        (filters.service === "all" || slot.service === filters.service)
    );
}

/**
 * Renders the chips with counts plus the admin search and dropdowns.
 * @param {Array<Object>} slots All availability slots, used for chip counts.
 * @param {string} activeChip The selected chip key.
 * @param {Function} onChipChange Called with the new chip key.
 * @param {Object} filters The current search, admin and service values.
 * @param {Function} onFiltersChange Called with the updated filters object.
 * @param {Array<string>} admins Admin names for the "All admins" dropdown.
 * @param {Array<string>} services Service names for the "All services" dropdown.
 * @returns {JSX.Element} The filter bar.
 */
export default function AvailabilityFilter({ slots, activeChip, onChipChange, filters, onFiltersChange, admins, services }) {
    function countFor(chip) {
        return chip.status ? slots.filter((s) => s.status === chip.status).length : slots.length;
    }

    function update(field, value) {
        onFiltersChange({ ...filters, [field]: value });
    }

    return (
        <div className="av-filter">
            <div className="av-chips" role="tablist" aria-label="Availability status">
                {AVAILABILITY_CHIPS.map((chip) => (
                    <button
                        key={chip.key}
                        type="button"
                        role="tab"
                        aria-selected={activeChip === chip.key}
                        className={`av-chip ${activeChip === chip.key ? "av-chip-active" : ""}`}
                        onClick={() => onChipChange(chip.key)}
                    >
                        {chip.label}
                        {chip.showCount && <span className="av-chip-count">{countFor(chip)}</span>}
                    </button>
                ))}
            </div>

            <div className="av-filter-row">
                <label className="av-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        type="search"
                        placeholder="Search admins"
                        value={filters.search}
                        onChange={(e) => update("search", e.target.value)}
                    />
                </label>

                <select className="av-select" value={filters.admin} onChange={(e) => update("admin", e.target.value)} aria-label="Filter by admin">
                    <option value="all">All admins</option>
                    {admins.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>

                <select className="av-select" value={filters.service} onChange={(e) => update("service", e.target.value)} aria-label="Filter by service">
                    <option value="all">All services</option>
                    {services.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
            </div>
        </div>
    );
}
