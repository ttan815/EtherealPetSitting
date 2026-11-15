// Renders the status tabs and search/dropdown filters for the owner's Appointments section.
import { APPOINTMENT_TABS } from "../../../constants/appointment";

/**
 * Renders the status tabs with counts plus the search and dropdowns.
 * @param {string} activeTab The selected tab key.
 * @param {Function} onTabChange Called with the new tab key.
 * @param {Object} counts Number of appointments per tab.
 * @param {Object} filters The current search, sitter and service values.
 * @param {Function} onFiltersChange Called with the updated filters object.
 * @param {Array<string>} sitters Names for the "All sitters" dropdown.
 * @param {Array<string>} services Names for the "All services" dropdown.
 * @returns {JSX.Element} The tabs and filter bar.
 */
export default function AppointmentFilter({ activeTab, onTabChange, counts, filters, onFiltersChange, sitters, services }) {
    function update(field, value) {
        onFiltersChange({ ...filters, [field]: value });
    }

    return (
        <div className="ap-filter">
            <div className="ap-tabs" role="tablist" aria-label="Appointment status">
                {APPOINTMENT_TABS.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.key}
                        className={`ap-tab ${activeTab === tab.key ? "ap-tab-active" : ""}`}
                        onClick={() => onTabChange(tab.key)}
                    >
                        {tab.label}
                        <span className="ap-tab-count">{counts[tab.key] ?? 0}</span>
                    </button>
                ))}
            </div>

            <div className="ap-filter-row">
                <label className="ap-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        type="search"
                        placeholder="Search pet or customer"
                        value={filters.search}
                        onChange={(e) => update("search", e.target.value)}
                    />
                </label>

                <select className="ap-select" value={filters.sitter} onChange={(e) => update("sitter", e.target.value)} aria-label="Filter by sitter">
                    <option value="all">All sitters</option>
                    {sitters.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>

                <select className="ap-select" value={filters.service} onChange={(e) => update("service", e.target.value)} aria-label="Filter by service">
                    <option value="all">All services</option>
                    {services.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
            </div>
        </div>
    );
}
