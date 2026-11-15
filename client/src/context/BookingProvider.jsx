// Provides shared booking provider state to the React application.
import { useEffect, useState } from "react";
import { BookingContext } from "../context/booking-context";
import { BOOKING_STORAGE_KEY, EMPTY_BOOKING } from "../constants/booking-state";

function loadBooking() {
  try {
    const saved = sessionStorage.getItem(BOOKING_STORAGE_KEY);
    return saved ? { ...EMPTY_BOOKING, ...JSON.parse(saved) } : EMPTY_BOOKING;
  } catch {
    return EMPTY_BOOKING; // storage blocked or unreadable: start fresh
  }
}

// Wraps the in-page booking flow so each step shares one booking (read it with useBooking).
/**
 * Provides and persists the in-progress booking for descendant booking routes.
 * @param {{children: import("react").ReactNode}} props - The provider's React children.
 * @returns {JSX.Element} The booking context provider.
 */
export default function BookingProvider({ children }) {
  const [booking, setBooking] = useState(loadBooking);

  useEffect(() => {
    try {
      sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
    } catch {
      // storage blocked: the booking still works until the page is refreshed
    }
  }, [booking]);

  // changes: only the fields that changed, e.g. updateBooking({ time: 720 })
  function updateBooking(changes) {
    setBooking((current) => ({ ...current, ...changes }));
  }

  return <BookingContext.Provider value={{ booking, updateBooking }}>{children}</BookingContext.Provider>;
}
