// Extracts valid service selections from booking URLs.
import { BOOKING_SERVICES } from "../constants/booking/booking-services";

// Links into booking can pick services in the URL, one "service" per id,
// e.g. the home page "Book this service": /book-appointment?service=dog-walking

// Known service ids from the URL; unknown or repeated ids are dropped
/**
 * Selects known booking service IDs requested by repeated `service` URL parameters.
 * @param {URLSearchParams} searchParams - The query parameters to read.
 * @returns {string[]} Known service IDs in the service catalog's order.
 */
export function getServiceIdsFromQuery(searchParams) {
  const requestedIds = searchParams.getAll("service");
  return BOOKING_SERVICES.map((service) => service.id).filter((id) => requestedIds.includes(id));
}
