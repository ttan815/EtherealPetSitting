import { BOOKING_SERVICES } from "../constants/booking-services";

// Links into booking can pick services in the URL, one "service" per id,
// e.g. the home page "Book this service": /book-appointment?service=dog-walking

// Known service ids from the URL; unknown or repeated ids are dropped
export function getServiceIdsFromQuery(searchParams) {
  const requestedIds = searchParams.getAll("service");
  return BOOKING_SERVICES.map((service) => service.id).filter((id) => requestedIds.includes(id));
}
