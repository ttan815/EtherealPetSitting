// Provides a React hook for use booking.
import { useContext } from "react";
import { BookingContext } from "../context/booking-context";

// The in-progress booking and updateBooking(changes); only works inside BookingProvider
/**
 * Reads the shared in-progress booking and its update function.
 * @returns {Object} The booking context value from the nearest BookingProvider.
 */
export function useBooking() {
  return useContext(BookingContext);
}
