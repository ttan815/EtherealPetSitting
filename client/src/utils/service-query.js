import { BOOKING_SERVICES } from "../constants/booking-services";

// The booking steps pass the picked services in the URL, one "service" per id:
// /book-appointment/date-time?service=drop-in-care&service=dog-walking

// Known service ids from the URL; unknown or repeated ids are dropped
export function getServiceIdsFromQuery(searchParams) {
  const requestedIds = searchParams.getAll("service");
  return BOOKING_SERVICES.map((service) => service.id).filter((id) => requestedIds.includes(id));
}

// ["drop-in-care", "dog-walking"] -> "service=drop-in-care&service=dog-walking"
export function toServiceQuery(serviceIds) {
  return new URLSearchParams(serviceIds.map((id) => ["service", id])).toString();
}
