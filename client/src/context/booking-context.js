import { createContext } from "react";

// Shared by BookingProvider (fills it) and useBooking (reads it)
export const BookingContext = createContext(null);
