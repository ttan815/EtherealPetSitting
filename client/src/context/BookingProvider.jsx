import { useEffect, useState } from "react";
import { BookingContext } from "./booking-context";
import { NO_PREFERENCE_SITTER_ID } from "../constants/booking-sitters";

// Everything the customer has picked so far in the book-appointment flow.
// Kept in sessionStorage so a page refresh doesn't lose it.
// BACKEND: the last step ("Review & Pay") should send this to the bookings API, then reset it.
const STORAGE_KEY = "ethereal-booking";

const EMPTY_BOOKING = {
  serviceIds: [], // step 1
  sitterId: NO_PREFERENCE_SITTER_ID, // step 2
  dateKey: null, // step 2, e.g. "2026-10-06"
  time: null, // step 2, minutes after midnight
  pets: null, // step 3: pets in this booking with their care details; null = not opened yet
  houseEntry: null, // step 3, shared by every pet; null = use the customer's saved notes
  additionalTasks: "", // step 3, shared by every pet
};

function loadBooking() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? { ...EMPTY_BOOKING, ...JSON.parse(saved) } : EMPTY_BOOKING;
  } catch {
    return EMPTY_BOOKING; // storage blocked or unreadable: start fresh
  }
}

// Wraps the booking routes in App.jsx so every step shares one booking (read it with useBooking)
export default function BookingProvider({ children }) {
  const [booking, setBooking] = useState(loadBooking);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
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
