import { APPOINTMENT_TABS } from "../constants/appointment";

// Temporary placeholder visits (Figma "Admin — Dashboard").
// BACKEND: replace with today's appointments from the API, in the same shape.
/**
 * Loads temporary Dashboard visits.
 * @returns {Array<{id: string, time: string, duration: string, petName: string, breed: string, service: string, customerName: string, sitterName: string, status: string}>} Visit records.
 */
export function getInitialVisits() {
    return [
        { id: "visit-biscuit", time: "8:00 AM", duration: "30 min", petName: "Biscuit", breed: "Golden Retriever", service: "Dog Walking", customerName: "Sarah M.", sitterName: "You", status: "completed" },
        { id: "visit-luna", time: "10:30 AM", duration: "45 min", petName: "Luna", breed: "Tabby Cat", service: "Drop-in Care", customerName: "James T.", sitterName: "Adrian", status: "completed" },
        { id: "visit-mochi", time: "1:00 PM", duration: "30 min", petName: "Mochi", breed: "Shiba Inu", service: "Medication", customerName: "Priya K.", sitterName: "You", status: "in-progress" },
        { id: "visit-pepper", time: "3:30 PM", duration: "1 hr", petName: "Pepper", breed: "Beagle", service: "Whole Day Care", customerName: "Daniel R.", sitterName: "Adrian", status: "upcoming" },
        { id: "visit-oliver", time: "6:00 PM", duration: "Overnight", petName: "Oliver", breed: "Maine Coon", service: "Overnight Stay", customerName: "Emma L.", sitterName: "You", status: "upcoming" },
    ];
}

// Temporary placeholder booking requests (Figma "Admin — Dashboard").
// BACKEND: replace these records and mutations with the bookings API.
const INITIAL_BOOKING_REQUESTS = [
    { id: "request-coco", petName: "Coco", breed: "Poodle", customerName: "Maria G.", service: "Overnight Stay", dateLabel: "Oct 3 – Oct 5", isDepositPaid: true, depositAmount: 20 },
    { id: "request-max", petName: "Max", breed: "Labrador", customerName: "Kevin P.", service: "Dog Walking", dateLabel: "Oct 1 · 9:00 AM", isDepositPaid: true, depositAmount: 20 },
    { id: "request-nala", petName: "Nala", breed: "Siamese Cat", customerName: "Lisa W.", service: "Drop-in Care", dateLabel: "Oct 2 · 12:00 PM", isDepositPaid: false, depositAmount: 20 },
];
let bookingRequests = INITIAL_BOOKING_REQUESTS.map((request) => ({ ...request }));

/**
 * Fetches the current temporary appointment requests for the Dashboard.
 * @returns {Array<{id: string, petName: string, breed: string, customerName: string, service: string, dateLabel: string, isDepositPaid: boolean, depositAmount: number}>} Pending booking requests.
 */
export function getInitialBookingRequests() {
    return bookingRequests.map((request) => ({ ...request }));
}

/**
 * Fetches the temporary admin choices for the appointment form.
 * @returns {Array<{id: string, label: string}>} Admin options.
 */
export function getAppointmentAdmins() {
    const names = new Set(
        getInitialVisits()
            .map((visit) => visit.sitterName)
            .filter((name) => name && name !== "You")
    );
    return Array.from(names, (name) => ({ id: name, label: name }));
}

/**
 * Fetches the temporary customer choices for the appointment form.
 * @returns {Array<{id: string, label: string}>} Customer options.
 */
export function getAppointmentCustomers() {
    const appointments = [...getInitialVisits(), ...getInitialBookingRequests()];
    const customers = new Map(
        appointments.map((appointment) => [
            appointment.customerName,
            { id: appointment.customerName, label: appointment.customerName },
        ])
    );
    return Array.from(customers.values());
}

/**
 * Fetches pets associated with a selected appointment-form customer.
 * @param {string} customerId The customer ID.
 * @returns {Array<{id: string, name: string, breed: string, label: string}>} Pet options.
 */
export function getAppointmentPets(customerId) {
    const appointments = [...getInitialVisits(), ...getInitialBookingRequests()];
    return appointments
        .filter((appointment) => appointment.customerName === customerId)
        .map((appointment) => ({
            id: appointment.id,
            name: appointment.petName,
            breed: appointment.breed,
            label: `${appointment.petName} · ${appointment.breed}`,
        }));
}

/**
 * Fetches the temporary service choices used by the appointment form.
 * @returns {Array<{id: string, label: string}>} Service options.
 */
export function getAppointmentServices() {
    const names = new Set(
        [...getInitialVisits(), ...getInitialBookingRequests()].map((appointment) => appointment.service)
    );
    return Array.from(names, (name) => ({ id: name, label: name }));
}

/**
 * Creates a temporary dashboard visit from a submitted appointment.
 * @param {Object} appointment Appointment form values.
 * @returns {Object} The dashboard visit.
 */
export function createAppointmentRecord(appointment) {
    const dateLabel = appointment.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return {
        id: `new-appointment-${Date.now()}`,
        time: appointment.startTimeLabel,
        endTime: appointment.endTimeLabel,
        dateLabel,
        duration: "",
        petName: appointment.petName || appointment.customerName || "Open booking",
        breed: appointment.petBreed,
        service: appointment.serviceLabel,
        customerName: appointment.customerName || "Open booking",
        sitterName: appointment.adminName || "Owner",
        status: "upcoming",
        approvalRequired: appointment.approvalRequired,
        note: appointment.note,
    };
}

/**
 * Approves a temporary booking request.
 * @param {string|number} id The booking request ID.
 * @returns {{ok: boolean, id: string|number, requests: Object[]}} Result and current requests.
 */
export function acceptBooking(id) {
    const requestIndex = bookingRequests.findIndex((request) => String(request.id) === String(id));
    if (requestIndex < 0) {
        return { ok: false, id, requests: getInitialBookingRequests() };
    }

    bookingRequests = bookingRequests.filter((request) => String(request.id) !== String(id));
    return { ok: true, id, requests: getInitialBookingRequests() };
}

/**
 * Declines a temporary booking request.
 * @param {string|number} id The booking request ID.
 * @param {string} [message] Optional message to the customer.
 * @returns {{ok: boolean, id: string|number, message: string, requests: Object[]}} Result and current requests.
 */
export function declineBookingRequest(id, message = "") {
    const requestExists = bookingRequests.some((request) => String(request.id) === String(id));
    if (!requestExists) {
        return { ok: false, id, message, requests: getInitialBookingRequests() };
    }

    bookingRequests = bookingRequests.filter((request) => String(request.id) !== String(id));
    return { ok: true, id, message, requests: getInitialBookingRequests() };
}

/**
 * Updates the status of a temporary appointment.
 * @param {string|number} id The appointment ID.
 * @param {string} status The new appointment status.
 * @returns {{ok: boolean, id: string|number, status: string}} The result.
 */
export function updateAppointmentStatus(id, status) {
    return { ok: Boolean(id), id, status };
}

const CUSTOMER_APPOINTMENTS = [
    {
        id: 1,
        petId: "mochi",
        petName: "Mochi",
        petBreed: "Shiba Inu",
        petType: "dog",
        service: "Drop-in care visit",
        date: "Oct 03, 2026",
        scheduledDate: "2026-10-03",
        time: "10:30 AM – 11:15 AM",
        startTime: "10:30 AM",
        endTime: "11:15 AM",
        status: "Confirmed",
        paymentStatus: "Pending payment",
        balance: "$28.00",
        amount: 28,
        sitterName: "Adrian P.",
        sitterRole: "Sitter",
        reminder: "24 hours before",
        confirmationReference: "EPB-2026-0847",
        transactionId: 1001,
        reschedulingFee: 0,
        payment: {
            servicePricing: "$28.00",
            requiredDeposit: "$20.00",
            depositPaidVia: "Visa ending in •••• 4242",
            remainingBalance: "$8.00",
        },
        careInstructions: {
            medication: "None required for this visit.",
            diet: "Feed 1/2 cup kibble at 12:00 PM. Clean water bowl thoroughly and fill to the brim.",
            allergies: "Slightly sensitive to wheat grains. Please only offer Ethereal Salmon treats.",
            houseEntry: "Code is 4821. Key is in the lockbox by back door. Code 0917. Lock deadbolt upon leaving.",
            additionalTasks: ["Water the plants on the back patio", "Bring in the daily mail from box"],
        },
    },
    {
        id: 2,
        petId: "luna",
        petName: "Luna",
        petBreed: "Tabby Cat",
        petType: "cat",
        service: "Pet Sitting",
        date: "Oct 08, 2026",
        scheduledDate: "2026-10-08",
        time: "2:00 PM – 2:45 PM",
        startTime: "2:00 PM",
        endTime: "2:45 PM",
        status: "Pending",
        paymentStatus: "Unpaid",
        balance: "$45.00",
        amount: 45,
        sitterName: "Angelena C.",
        sitterRole: "Owner",
        reminder: "24 hours before",
        confirmationReference: "EPB-2026-0848",
        transactionId: 1002,
        reschedulingFee: 0,
        payment: {
            servicePricing: "$45.00",
            requiredDeposit: "$20.00",
            depositPaidVia: "Not paid",
            remainingBalance: "$45.00",
        },
        careInstructions: {
            medication: "No medication required.",
            diet: "Feed one pouch of wet food and refresh the water bowl.",
            allergies: "None known.",
            houseEntry: "Use the side entrance and make sure the gate is latched.",
            additionalTasks: [],
        },
    },
    {
        id: 3,
        petId: "mochi",
        petName: "Mochi",
        petBreed: "Shiba Inu",
        petType: "dog",
        service: "Dog Walking",
        date: "Oct 10, 2026",
        scheduledDate: "2026-10-10",
        time: "11:00 AM – 11:30 AM",
        startTime: "11:00 AM",
        endTime: "11:30 AM",
        status: "Confirmed",
        paymentStatus: "Paid",
        balance: "$0.00",
        amount: 30,
        sitterName: "Adrian P.",
        sitterRole: "Sitter",
        reminder: "24 hours before",
        confirmationReference: "EPB-2026-0849",
        transactionId: 1003,
        reschedulingFee: 0,
        payment: {
            servicePricing: "$30.00",
            requiredDeposit: "$20.00",
            depositPaidVia: "Visa ending in •••• 4242",
            remainingBalance: "$0.00",
        },
        careInstructions: {
            medication: "None required for this visit.",
            diet: "No feeding needed during the walk.",
            allergies: "Check treats for wheat grains.",
            houseEntry: "Use the side gate; lock the deadbolt when leaving.",
            additionalTasks: [],
        },
    },
    {
        id: 4,
        petId: "mochi",
        petName: "Mochi",
        petBreed: "Shiba Inu",
        petType: "dog",
        service: "Drop-in care visit",
        date: "Oct 03, 2026",
        scheduledDate: "2026-10-03",
        time: "10:30 AM – 11:15 AM",
        startTime: "10:30 AM",
        endTime: "11:15 AM",
        status: "Completed",
        paymentStatus: "Paid",
        balance: "$0.00",
        amount: 28,
        sitterName: "Adrian P.",
        sitterRole: "Sitter",
        reminder: "",
        confirmationReference: "EPB-2026-0840",
        transactionId: 1000,
        reschedulingFee: 0,
        payment: {
            servicePricing: "$28.00",
            requiredDeposit: "$20.00",
            depositPaidVia: "Visa ending in •••• 4242",
            remainingBalance: "$0.00",
        },
        careInstructions: {
            medication: "None required for this visit.",
            diet: "Feed 1/2 cup kibble at noon.",
            allergies: "Slightly sensitive to wheat grains.",
            houseEntry: "Use the lockbox by the back door.",
            additionalTasks: [],
        },
    },
    {
        id: 5,
        petId: "luna",
        petName: "Luna",
        petBreed: "Tabby Cat",
        petType: "cat",
        service: "Pet Sitting",
        date: "Sep 28, 2026",
        scheduledDate: "2026-09-28",
        time: "2:00 PM – 2:45 PM",
        startTime: "2:00 PM",
        endTime: "2:45 PM",
        status: "Completed",
        paymentStatus: "Paid",
        balance: "$0.00",
        amount: 45,
        sitterName: "Angelena C.",
        sitterRole: "Owner",
        reminder: "",
        confirmationReference: "EPB-2026-0837",
        transactionId: 999,
        reschedulingFee: 0,
        payment: {
            servicePricing: "$45.00",
            requiredDeposit: "$20.00",
            depositPaidVia: "Visa ending in •••• 4242",
            remainingBalance: "$0.00",
        },
        careInstructions: {
            medication: "No medication required.",
            diet: "Feed one pouch of wet food.",
            allergies: "None known.",
            houseEntry: "Use the side entrance.",
            additionalTasks: [],
        },
    },
    {
        id: 6,
        petId: "mochi",
        petName: "Mochi",
        petBreed: "Shiba Inu",
        petType: "dog",
        service: "Dog Walking",
        date: "Sep 21, 2026",
        scheduledDate: "2026-09-21",
        time: "11:00 AM – 11:30 AM",
        startTime: "11:00 AM",
        endTime: "11:30 AM",
        status: "Completed",
        paymentStatus: "Paid",
        balance: "$0.00",
        amount: 30,
        sitterName: "Adrian P.",
        sitterRole: "Sitter",
        reminder: "",
        confirmationReference: "EPB-2026-0829",
        transactionId: 998,
        reschedulingFee: 0,
        payment: {
            servicePricing: "$30.00",
            requiredDeposit: "$20.00",
            depositPaidVia: "Visa ending in •••• 4242",
            remainingBalance: "$0.00",
        },
        careInstructions: {
            medication: "None required for this visit.",
            diet: "No feeding needed during the walk.",
            allergies: "Check treats for wheat grains.",
            houseEntry: "Use the side gate; lock the deadbolt when leaving.",
            additionalTasks: [],
        },
    },
];

function cloneAppointment(appointment) {
    return {
        ...appointment,
        payment: { ...appointment.payment },
        careInstructions: {
            ...appointment.careInstructions,
            additionalTasks: [...appointment.careInstructions.additionalTasks],
        },
    };
}

/**
 * Fetches temporary customer appointments filtered by upcoming or past status.
 * @param {"upcoming"|"past"} status The appointment group to fetch.
 * @returns {Object[]} Matching appointment records.
 */
export function getCustomerAppointments(status) {
    if (status !== "upcoming" && status !== "past") {
        throw new TypeError('Appointment status must be "upcoming" or "past".');
    }
    const isUpcoming = status === "upcoming";
    return CUSTOMER_APPOINTMENTS
        .filter((appointment) => (appointment.status === "Completed") !== isUpcoming)
        .map(cloneAppointment);
}

/**
 * Fetches temporary upcoming appointments for the signed-in customer.
 * Convenience wrapper around {@link getCustomerAppointments}.
 * @returns {Object[]} Upcoming appointments.
 */
export function getUpcomingAppointments() {
    return getCustomerAppointments("upcoming");
}

/**
 * Fetches temporary past appointments for the signed-in customer.
 * Convenience wrapper around {@link getCustomerAppointments}.
 * @returns {Object[]} Past appointments.
 */
export function getPastAppointments() {
    return getCustomerAppointments("past");
}

/**
 * Fetches a temporary appointment detail record.
 * @param {string|number} appointmentId The appointment ID.
 * @returns {Object|null} Appointment details, or null when the ID is unknown.
 */
export function getAppointmentById(appointmentId) {
    const appointment = CUSTOMER_APPOINTMENTS.find(
        (record) => String(record.id) === String(appointmentId),
    );
    return appointment ? cloneAppointment(appointment) : null;
}


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
 * @param {Object} filters The active tab, search text, sitter and service (sent as query params once the API exists); currently unused by the mock.
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
 * Temporary method that accepts a booking request.
 * @param {number} id The appointment id.
 * @returns {Object} The backend result.
 */
export function acceptAppointment(id) {
    const temp = { ok: true, id, status: "confirmed" }; // Result from fetch(`/api/appointments/${id}/accept`)
    return temp;
}

/**
 * Temporary method that declines a booking request.
 * @param {number} id The appointment id.
 * @param {string} reason Optional message sent to the customer.
 * @returns {Object} The backend result.
 */
export function declineAppointment(id, reason) {
    const temp = { ok: true, id, status: "cancelled", reason }; // Result from fetch(`/api/appointments/${id}/decline`)
    return temp;
}

/**
 * Temporary method that marks an in-progress visit as complete.
 * @param {number} id The appointment id.
 * @returns {Object} The backend result.
 */
export function markAppointmentComplete(id) {
    const temp = { ok: true, id, status: "completed" }; // Result from fetch(`/api/appointments/${id}/complete`)
    return temp;
}

/**
 * Temporary method that moves an appointment to a new date and time.
 * @param {number} id The appointment id.
 * @param {Object} dateTime The new { date: "YYYY-MM-DD", time: "HH:MM" }.
 * @returns {Object} The backend result.
 */
export function rescheduleAppointment(id, dateTime) {
    const temp = { ok: true, id, ...dateTime }; // Result from fetch(`/api/appointments/${id}/reschedule`)
    return temp;
}

/**
 * Temporary method that cancels a confirmed or in-progress visit.
 * @param {number} id The appointment id.
 * @returns {Object} The backend result.
 */
export function cancelAppointment(id) {
    const temp = { ok: true, id, status: "cancelled" }; // Result from fetch(`/api/appointments/${id}/cancel`)
    return temp;
}

/**
 * Temporary method that fetches open time slots for a date.
 * @param {string} date The date as "YYYY-MM-DD".
 * @returns {Array<Object>} Slots like { time: "08:00", period: "morning", available: true }.
 */
export function getAvailableTimes(date) {
    const weekend = [0, 6].includes(parseISODate(date).getDay());
    const temp = [
        { time: "08:00", period: "morning", available: true },
        { time: "10:00", period: "morning", available: true },
        { time: "12:00", period: "afternoon", available: true },
        { time: "15:00", period: "afternoon", available: !weekend },
    ]; // Result from fetch(`/api/availability/times?date=${date}`)
    return temp;
}

/**
 * Turns an appointment's payment fields into the text shown in the Payment column.
 * @param {Object} appointment The appointment.
 * @returns {string} e.g. "Deposit $20 paid", "Deposit not paid yet", "Paid in full" or "Balance unpaid".
 */
export function paymentText(appointment) {
    switch (appointment.payment) {
        case "deposit_paid": return `Deposit $${appointment.deposit} paid`;
        case "deposit_unpaid": return "Deposit not paid yet";
        case "paid_full": return "Paid in full";
        default: return "Balance unpaid";
    }
}

/**
 * Builds the two lines for the Date & Time column.
 * @param {Object} appointment The appointment.
 * @returns {Array<string>} [dayLine, timeLine], e.g. ["Oct 3 – Oct 5", "6:00 PM check-in"].
 */
export function dateLines(appointment) {
    const day = appointment.endDate
        ? `${formatDay(appointment.date, false)} – ${formatDay(appointment.endDate, false)}`
        : formatDay(appointment.date);
    const time = `${formatTime(appointment.time)}${appointment.checkIn ? " check-in" : ""}`;
    return [day, time];
}

/**
 * Temporary method that assigns a sitter to an appointment.
 * @param {number} id The appointment id.
 * @param {string|null} sitter The sitter's name, "You", or null for unassigned.
 * @returns {Object} The backend result.
 */
export function assignSitter(id, sitter) {
    const temp = { ok: true, id, sitter }; // Result from fetch(`/api/appointments/${id}/sitter`)
    return temp;
}

/**
 * Moves an appointment's end date by the same number of days as its start date.
 * @param {string} iso Appointment end date.
 * @param {string} fromIso Original start date.
 * @param {string} toIso New start date.
 * @returns {string} The updated end date.
 */
export function shiftDate(iso, fromIso, toIso) {
    const days = Math.round((parseISODate(toIso) - parseISODate(fromIso)) / 86400000);
    const d = parseISODate(iso);
    d.setDate(d.getDate() + days);
    return toISODate(d);
}
