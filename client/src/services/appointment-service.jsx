// Temporary placeholder visits (Figma "Admin — Dashboard").
// BACKEND: replace with today's appointments from the API, in the same shape.
/**
 * Loads the temporary Dashboard visit list.
 * @returns {Object[]} Initial visits.
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
 * @returns {Object[]} Current pending booking requests.
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
 * @returns {Object[]} Upcoming appointments.
 */
export function getUpcomingAppointments() {
    return getCustomerAppointments("upcoming");
}

/**
 * Fetches temporary past appointments for the signed-in customer.
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
