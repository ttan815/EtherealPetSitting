import { BOOKING_SERVICES, BOOKING_SERVICE_PRICES, HOMEPAGE_SERVICES } from "../../constants/booking/booking-services";
import { BOOKING_SITTERS } from "../../constants/booking/booking-sitters";

/**
 * Returns service presentation enriched with configured fallback prices.
 * @returns {Object[]} Booking services with starting prices.
 */
export function getBookingServices() {
    return BOOKING_SERVICES.map((service) => ({
        ...service,
        startingPrice: BOOKING_SERVICE_PRICES[service.id] ?? null,
    }));
}

/**
 * Returns booking sitter choices and their supported service IDs.
 * @returns {Object[]} Sitter option records.
 */
export function getBookingSitters() {
    return BOOKING_SITTERS.map((sitter) => ({
        ...sitter,
        serviceIds: sitter.serviceIds ? [...sitter.serviceIds] : null,
    }));
}

/**
 * Returns local homepage service-card presentation data.
 * @returns {Object[]} Homepage service offerings.
 */
export function getHomepageServices() {
    return HOMEPAGE_SERVICES.map((service) => ({ ...service }));
}