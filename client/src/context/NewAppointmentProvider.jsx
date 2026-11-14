import { useCallback, useMemo, useState } from "react";
import { NEW_APPOINTMENT_POPUP_PROPS, NewAppointmentContext } from "./NewAppointmentContext";
import { getInitialVisits } from "../constants/NewAppointmentData";

/**
 * Provides shared appointment-popup options and dashboard appointment state.
 * @param {Object} props Provider props.
 * @param {import("react").ReactNode} props.children Owner dashboard content.
 * @returns {JSX.Element} The appointment context provider.
 */
export function NewAppointmentProvider({ children }) {
    const [visits, setVisits] = useState(getInitialVisits);

    const addAppointment = useCallback((appointment) => {
        const dateLabel = appointment.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        setVisits((current) => [
            ...current,
            {
                id: `new-appointment-${Date.now()}`,
                time: appointment.startTimeLabel,
                endTime: appointment.endTimeLabel,
                dateLabel,
                duration: "",
                petName: appointment.petName || appointment.customerName || NEW_APPOINTMENT_POPUP_PROPS.copy.openBookingLabel,
                breed: appointment.petBreed,
                service: appointment.serviceLabel,
                customerName: appointment.customerName || NEW_APPOINTMENT_POPUP_PROPS.copy.openBookingLabel,
                sitterName: appointment.adminName || NEW_APPOINTMENT_POPUP_PROPS.copy.ownerLabel,
                status: "upcoming",
                approvalRequired: appointment.approvalRequired,
                note: appointment.note,
            },
        ]);
    }, []);

    const markAppointmentComplete = useCallback((id) => {
        setVisits((current) => current.map((visit) => (visit.id === id ? { ...visit, status: "completed" } : visit)));
    }, []);

    const value = useMemo(() => ({
        visits,
        addAppointment,
        markAppointmentComplete,
        popupProps: NEW_APPOINTMENT_POPUP_PROPS,
    }), [addAppointment, markAppointmentComplete, visits]);

    return (
        <NewAppointmentContext.Provider value={value}>
            {children}
        </NewAppointmentContext.Provider>
    );
}
