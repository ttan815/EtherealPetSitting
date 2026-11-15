import { useCallback, useMemo, useState } from "react";
import { NewAppointmentContext } from "./NewAppointmentContext";
import { NEW_APPOINTMENT_COPY, OWNER_APPOINTMENT_OPTION } from "../constants/appointment-copy";
import {
    createAppointmentRecord,
    getAppointmentAdmins,
    getAppointmentCustomers,
    getAppointmentPets,
    getAppointmentServices,
    getInitialVisits,
    updateAppointmentStatus,
} from "../services/appointment-service";

/**
 * Provides shared appointment-popup options and dashboard appointment state.
 * @param {Object} props Provider props.
 * @param {import("react").ReactNode} props.children Owner dashboard content.
 * @returns {JSX.Element} The appointment context provider.
 */
export function NewAppointmentProvider({ children }) {
    const [visits, setVisits] = useState(getInitialVisits);

    const addAppointment = useCallback((appointment) => {
        setVisits((current) => [...current, createAppointmentRecord(appointment)]);
    }, []);

    const markAppointmentComplete = useCallback((id) => {
        const result = updateAppointmentStatus(id, "completed");
        if (result.ok) {
            setVisits((current) => current.map((visit) => (
                visit.id === id ? { ...visit, status: result.status } : visit
            )));
        }
    }, []);

    const popupProps = useMemo(() => ({
        adminId: "owner",
        ownerOption: OWNER_APPOINTMENT_OPTION,
        services: getAppointmentServices(),
        copy: NEW_APPOINTMENT_COPY,
        getListOfAdmin: getAppointmentAdmins,
        getListOfCustomer: getAppointmentCustomers,
        getListOfPets: getAppointmentPets,
    }), []);
    const value = useMemo(() => ({
        visits,
        addAppointment,
        markAppointmentComplete,
        popupProps,
    }), [addAppointment, markAppointmentComplete, popupProps, visits]);

    return (
        <NewAppointmentContext.Provider value={value}>
            {children}
        </NewAppointmentContext.Provider>
    );
}
