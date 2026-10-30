import { useContext } from "react";
import { BookingContext } from "../context/booking-context";

// The in-progress booking and updateBooking(changes); only works inside BookingProvider
export function useBooking() {
  return useContext(BookingContext);
}
