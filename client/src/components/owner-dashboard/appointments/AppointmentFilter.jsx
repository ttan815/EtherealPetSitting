// Renders the status tabs and search/dropdown filters for the owner's Appointments section.

/** Tabs in display order. `statuses` lists which appointment statuses each tab shows. */
export const APPOINTMENT_TABS = [
    { key: "all", label: "All", statuses: null },
    { key: "requests", label: "Requests", statuses: ["request"] },
    { key: "upcoming", label: "Upcoming", statuses: ["confirmed", "in_progress"] },
    { key: "completed", label: "Completed", statuses: ["completed"] },
    { key: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

/**
 * Builds a "YYYY-MM-DD" string a number of days away from today.
 * @param {number} offset Days from today; 0 is today, -1 is yesterday.
 * @returns {string} The date string.
 */
export function dateFromToday(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return toISODate(d);
}

/**
 * Turns a Date into "YYYY-MM-DD" using local time.
 * @param {Date} date The date to convert.
 * @returns {string} The date string.
 */
export function toISODate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * Turns "YYYY-MM-DD" into a local Date.
 * @param {string} iso The date string.
 * @returns {Date} The date.
 */
export function parseISODate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
}

/**
 * Turns a 24-hour "HH:MM" string into "9:00 AM".
 * @param {string} time The time in 24-hour format.
 * @returns {string} The time in 12-hour format.
 */
export function formatTime(time) {
    const [h, m] = time.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

/**
 * Turns "YYYY-MM-DD" into "Today" or a short date like "Thu, Oct 1".
 * @param {string} iso The date string.
 * @param {boolean} withWeekday Include the weekday, e.g. "Thu, Oct 1" instead of "Oct 1".
 * @returns {string} The readable date.
 */
export function formatDay(iso, withWeekday = true) {
    if (iso === dateFromToday(0) && withWeekday) return "Today";
    return parseISODate(iso).toLocaleDateString("en-US", withWeekday
        ? { weekday: "short", month: "short", day: "numeric" }
        : { month: "short", day: "numeric" });
}

// Temporary data until the API is connected. Dates are relative to today so "Today" rows always show.
const TEMP_APPOINTMENTS = [
    {
        id: 1, pet: "Coco", breed: "Poodle", customer: "Maria G.", service: "Overnight Stay",
        date: dateFromToday(3), endDate: dateFromToday(5), time: "18:00", checkIn: true, length: "2 nights",
        sitter: null, payment: "deposit_paid", deposit: 20, balance: 120, status: "request",
        phone: "(916) 555-0101", email: "maria.g@email.com", address: "22 Oak St",
        allergy: null, medication: "None", diet: "Half cup kibble twice a day", notes: "Loves belly rubs",
        access: "Front door code 1122.", tasks: [{ label: "Turn on porch light", done: false }],
    },
    {
        id: 2, pet: "Max", breed: "Labrador", customer: "Kevin P.", service: "Dog Walking",
        date: dateFromToday(1), time: "09:00", length: "30 min",
        sitter: null, payment: "deposit_paid", deposit: 20, balance: 5, status: "request",
        phone: "(916) 555-0177", email: "kevin.p@email.com", address: "910 Pine Rd",
        allergy: null, medication: "None", diet: "No treats before walks", notes: "Pulls on the leash",
        access: "Leash hangs by the garage door.", tasks: [],
    },
    {
        id: 3, pet: "Nala", breed: "Siamese Cat", customer: "Lisa W.", service: "Drop-in Care",
        date: dateFromToday(2), time: "12:00", length: "45 min",
        sitter: null, payment: "deposit_unpaid", deposit: 20, balance: 35, status: "request",
        phone: "(916) 555-0133", email: "lisa.w@email.com", address: "77 Elm Ct",
        allergy: null, medication: "None", diet: "Wet food, 1 can", notes: "Hides from strangers",
        access: "Key under the mat.", tasks: [{ label: "Scoop litter box", done: false }],
    },
    {
        id: 4, pet: "Mochi", breed: "Shiba Inu", customer: "Priya K.", service: "Medication",
        date: dateFromToday(0), time: "13:00", length: "30 min",
        sitter: "You", payment: "paid_full", deposit: 20, balance: 0, status: "in_progress",
        phone: "(510) 555-0142", email: "priya.k@email.com", address: "1450 Maple Ave, Apt 3B",
        allergy: "Allergic to chicken", medication: "Allergy tablet — 1 daily at 1:00 PM with food",
        diet: "1 cup dry food at 8 AM and 6 PM", notes: "Nervous around loud noises",
        access: "Side gate code 4821. Spare key in the lockbox by the back door (0917).",
        tasks: [{ label: "Bring in the mail", done: true }, { label: "Water the patio plants", done: false }],
    },
    {
        id: 5, pet: "Pepper", breed: "Beagle", customer: "Daniel R.", service: "Whole Day Care",
        date: dateFromToday(0), time: "15:30", length: "8 hours",
        sitter: "Adrian", payment: "deposit_paid", deposit: 20, balance: 60, status: "confirmed",
        phone: "(916) 555-0190", email: "daniel.r@email.com", address: "5 Birch Ln",
        allergy: null, medication: "None", diet: "Lunch at noon", notes: "Very friendly",
        access: "Doorman will let you in.", tasks: [],
    },
    {
        id: 6, pet: "Oliver", breed: "Maine Coon", customer: "Emma L.", service: "Overnight Stay",
        date: dateFromToday(0), time: "18:00", length: "1 night",
        sitter: "You", payment: "deposit_paid", deposit: 50, balance: 40, status: "confirmed",
        phone: "(916) 555-0115", email: "emma.l@email.com", address: "300 Cedar Way",
        allergy: null, medication: "None", diet: "Dry food, free feed", notes: "Needs brushing",
        access: "Garage code 6060.", tasks: [{ label: "Brush Oliver", done: false }],
    },
    {
        id: 7, pet: "Biscuit", breed: "Golden Retriever", customer: "Sarah M.", service: "Dog Walking",
        date: dateFromToday(0), time: "08:00", length: "30 min",
        sitter: "You", payment: "balance_unpaid", deposit: 20, balance: 5, status: "completed",
        phone: "(916) 555-0166", email: "sarah.m@email.com", address: "41 Willow Dr",
        allergy: null, medication: "None", diet: "Water after the walk", notes: "Loves the park",
        access: "Back gate is unlocked.", tasks: [],
    },
    {
        id: 8, pet: "Luna", breed: "Tabby Cat", customer: "James T.", service: "Drop-in Care",
        date: dateFromToday(0), time: "10:30", length: "45 min",
        sitter: "Adrian", payment: "paid_full", deposit: 20, balance: 0, status: "completed",
        phone: "(916) 555-0122", email: "james.t@email.com", address: "8 Spruce Ave",
        allergy: null, medication: "None", diet: "Wet food, half can", notes: "Shy at first",
        access: "Key in the lockbox (2468).", tasks: [{ label: "Refill water fountain", done: true }],
    },
];

/**
 * Temporary method that fetches the sitters for the "All sitters" dropdown.
 * @returns {Array<string>} Sitter names; "You" is the owner.
 */
export function getSitters() {
    const temp = ["You", "Adrian", "Unassigned"]; // Result from fetch("/api/sitters")
    return temp;
}

/**
 * Temporary method that fetches the services for the "All services" dropdown.
 * @returns {Array<string>} Service names.
 */
export function getServices() {
    const temp = ["Dog Walking", "Drop-in Care", "Medication", "Overnight Stay", "Whole Day Care"]; // Result from fetch("/api/services")
    return temp;
}

/**
 * Temporary method that fetches appointments from the backend.
 * @param {Object} filters The active tab, search text, sitter and service (sent as query params once the API exists).
 * @returns {Array<Object>} The appointments.
 */
export function getAppointments(filters) {
    const temp = TEMP_APPOINTMENTS.map((a) => ({ ...a, tasks: a.tasks.map((t) => ({ ...t })) })); // Result from fetch(`/api/appointments?...`, filters)
    return temp;
}

/**
 * Temporary method that counts appointments per tab.
 * @param {Array<Object>} appointments The appointments to count; uses the backend list when not given.
 * @returns {Object} Counts keyed by tab, e.g. { all: 8, requests: 3, ... }.
 */
export function getAppointmentCounts(appointments = TEMP_APPOINTMENTS) {
    const temp = Object.fromEntries(APPOINTMENT_TABS.map((tab) => [
        tab.key,
        tab.statuses ? appointments.filter((a) => tab.statuses.includes(a.status)).length : appointments.length,
    ])); // Result from fetch("/api/appointments/counts")
    return temp;
}

/**
 * Keeps only the appointments that match the active tab and every filter.
 * @param {Array<Object>} appointments All appointments.
 * @param {string} activeTab The selected tab key, e.g. "requests".
 * @param {Object} filters The search text, sitter and service filters.
 * @returns {Array<Object>} The matching appointments.
 */
export function filterAppointments(appointments, activeTab, filters) {
    const tab = APPOINTMENT_TABS.find((t) => t.key === activeTab);
    const search = filters.search.trim().toLowerCase();

    return appointments.filter((a) =>
        (!tab?.statuses || tab.statuses.includes(a.status)) &&
        (!search || a.pet.toLowerCase().includes(search) || a.customer.toLowerCase().includes(search)) &&
        (filters.sitter === "all" || (a.sitter ?? "Unassigned") === filters.sitter) &&
        (filters.service === "all" || a.service === filters.service)
    );
}

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
