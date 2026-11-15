import { NO_PREFERENCE_SITTER_ID } from "./booking-sitters";

/** @type {string} Session-storage key for the in-progress booking. */
export const BOOKING_STORAGE_KEY = "ethereal-booking";

/**
 * Initial state for the booking flow.
 * @type {Object}
 */
export const EMPTY_BOOKING = {
    appointments: [],
    activeAppointmentIndex: 0,
    serviceIds: [],
    sitterId: NO_PREFERENCE_SITTER_ID,
    dateKey: null,
    time: null,
    pets: null,
    houseEntry: null,
    additionalTasks: "",
    paymentMethod: "card",
};
