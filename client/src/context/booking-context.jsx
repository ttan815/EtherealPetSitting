// Provides shared booking context state to the React application.
import { createContext } from "react";

// Shared by BookingProvider (fills it) and useBooking (reads it)
export const BookingContext = createContext(null);
