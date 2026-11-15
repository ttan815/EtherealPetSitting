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
// BACKEND: replace with the pending booking requests from the API, in the same shape.
/**
 * Loads temporary appointment requests for the Dashboard.
 * @returns {Object[]} Initial booking requests.
 */
export function getInitialBookingRequests() {
    return [
        { id: "request-coco", petName: "Coco", breed: "Poodle", customerName: "Maria G.", service: "Overnight Stay", dateLabel: "Oct 3 – Oct 5", isDepositPaid: true, depositAmount: 20 },
        { id: "request-max", petName: "Max", breed: "Labrador", customerName: "Kevin P.", service: "Dog Walking", dateLabel: "Oct 1 · 9:00 AM", isDepositPaid: true, depositAmount: 20 },
        { id: "request-nala", petName: "Nala", breed: "Siamese Cat", customerName: "Lisa W.", service: "Drop-in Care", dateLabel: "Oct 2 · 12:00 PM", isDepositPaid: false, depositAmount: 20 },
    ];
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
 * @returns {{ok: boolean, id: string|number}} The result.
 */
export function acceptBookingRequest(id) {
    return { ok: Boolean(id), id };
}

/**
 * Declines a temporary booking request.
 * @param {string|number} id The booking request ID.
 * @param {string} [message] Optional message to the customer.
 * @returns {{ok: boolean, id: string|number}} The result.
 */
export function declineBookingRequest(id, message = "") {
    return { ok: Boolean(id), id, message };
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

/**
 * Fetches temporary upcoming appointments for the signed-in customer.
 * @returns {Object[]} Upcoming appointments.
 */
export function getUpcomingAppointments() {
    return [
        { id: 1, petName: "Buddy", service: "Dog Walking", date: "Oct 26, 2026", time: "10:00 AM", status: "Confirmed", paymentStatus: "Paid", balance: "$0.00", petType: "dog" },
        { id: 2, petName: "Luna", service: "Pet Sitting", date: "Oct 28, 2026", time: "2:00 PM", status: "Pending", paymentStatus: "Unpaid", balance: "$45.00", petType: "cat" },
        { id: 3, petName: "Max", service: "Pet Grooming", date: "Oct 30, 2026", time: "11:00 AM", status: "Confirmed", paymentStatus: "Paid", balance: "$0.00", petType: "dog" },
    ];
}

/**
 * Fetches temporary past appointments for the signed-in customer.
 * @returns {Object[]} Past appointments.
 */
export function getPastAppointments() {
    return [
        { id: 1, petName: "Samson", service: "Dog Walking", date: "Oct 26, 2026", time: "10:00 AM", status: "Completed", paymentStatus: "Paid", balance: "$0.00", petType: "dog" },
        { id: 2, petName: "Pops", service: "Pet Sitting", date: "Oct 28, 2026", time: "2:00 PM", status: "Completed", paymentStatus: "Paid", balance: "$0.00", petType: "cat" },
        { id: 3, petName: "Carl", service: "Pet Grooming", date: "Oct 30, 2026", time: "11:00 AM", status: "Completed", paymentStatus: "Paid", balance: "$0.00", petType: "dog" },
    ];
}

/**
 * Fetches a temporary appointment detail record.
 * @param {string|number} appointmentId The appointment ID.
 * @returns {Object} Appointment details.
 */
export function getAppointmentById(appointmentId) {
    return {
        id: appointmentId,
        sitter: "Owner",
        service: "Trim",
        petId: 101,
        date: "Oct 26, 2026",
        time: "10:00 AM",
        transactionId: 1001,
    };
}
