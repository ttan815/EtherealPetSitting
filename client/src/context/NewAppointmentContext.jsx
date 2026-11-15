import { createContext, useContext } from "react";

/**
 * Gets the temporary appointment requests shared with the owner dashboard.
 * @returns {Object[]} The initial booking requests.
 */
export { getInitialBookingRequests } from "../services/appointment-service";

export const NewAppointmentContext = createContext(null);

/**
 * Reads the shared owner-dashboard appointment data.
 * @returns {Object} Popup configuration and appointment state/actions from context.
 */
export function useNewAppointment() {
    const context = useContext(NewAppointmentContext);
    if (!context) {
        throw new Error("useNewAppointment must be used within NewAppointmentProvider.");
    }
    return context;
}
