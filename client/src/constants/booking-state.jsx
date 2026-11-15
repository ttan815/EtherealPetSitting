import { NO_PREFERENCE_SITTER_ID } from "./booking-sitters";

export const BOOKING_STORAGE_KEY = "ethereal-booking";

export const EMPTY_BOOKING = {
    serviceIds: [],
    sitterId: NO_PREFERENCE_SITTER_ID,
    dateKey: null,
    time: null,
    pets: null,
    houseEntry: null,
    additionalTasks: "",
    paymentMethod: "card",
};
