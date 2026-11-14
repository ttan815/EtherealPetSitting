import { createContext, useContext } from "react";
import { getInitialBookingRequests, getInitialVisits } from "../constants/NewAppointmentData";

const NEW_APPOINTMENT_COPY = {
    openButtonLabel: "New Appointment",
    dialogTitle: "Request availability",
    ownerDescription: "Update this slot for the admin. Saved changes go back to them for approval.",
    adminDescription: "Offer a time slot. The owner reviews it before it appears on the booking page.",
    closeButtonLabel: "Close",
    adminLabel: "Admin",
    adminPlaceholder: "Choose an admin",
    ownerLabel: "Owner",
    approvalLegend: "Approval",
    requireApproval: "Require Approval",
    skipApproval: "Skip Approval",
    dateLabel: "Date",
    datePlaceholder: "Select a date",
    dateFormat: "EEE, MMM d, yyyy",
    startTimeLabel: "Start time",
    startTimePlaceholder: "Choose a start time",
    endTimeLabel: "End time",
    endTimePlaceholder: "Choose an end time",
    serviceLabel: "Type of service",
    servicePlaceholder: "Choose a service",
    customerLabel: "Customer (optional)",
    customerPlaceholder: "None - open booking",
    openBookingLabel: "Open booking",
    petLabel: "Pet",
    petPlaceholder: "Select a customer first",
    noteLabel: "Note (optional)",
    notePlaceholder: "Add anything the owner should know...",
    cancelButtonLabel: "Cancel",
    submitButtonLabel: "Send request",
    loadingText: "Loading options...",
    lookupError: "Unable to load appointment options. Please try again.",
    submitError: "Unable to submit the appointment. Please try again.",
};

const OWNER_APPOINTMENT_OPTION = {
    id: "owner",
    label: NEW_APPOINTMENT_COPY.ownerLabel,
};

function getAppointmentAdmins() {
    const adminNames = new Set(
        getInitialVisits()
            .map((visit) => visit.sitterName)
            .filter((name) => name && name !== "You")
    );
    return Array.from(adminNames, (name) => ({ id: name, label: name }));
}

function getAppointmentCustomers() {
    const appointmentData = [...getInitialVisits(), ...getInitialBookingRequests()];
    const customers = new Map(
        appointmentData.map((appointment) => [
            appointment.customerName,
            { id: appointment.customerName, label: appointment.customerName },
        ])
    );
    return Array.from(customers.values());
}

function getAppointmentPets(customerId) {
    const appointmentData = [...getInitialVisits(), ...getInitialBookingRequests()];
    return appointmentData
        .filter((appointment) => appointment.customerName === customerId)
        .map((appointment) => ({
            id: appointment.id,
            name: appointment.petName,
            breed: appointment.breed,
            label: `${appointment.petName} · ${appointment.breed}`,
        }));
}

function getAppointmentServices() {
    const appointmentData = [...getInitialVisits(), ...getInitialBookingRequests()];
    const serviceNames = new Set(appointmentData.map((appointment) => appointment.service));
    return Array.from(serviceNames, (name) => ({ id: name, label: name }));
}

export const NewAppointmentContext = createContext(null);
export const NEW_APPOINTMENT_POPUP_PROPS = {
    adminId: "owner",
    ownerOption: OWNER_APPOINTMENT_OPTION,
    services: getAppointmentServices(),
    copy: NEW_APPOINTMENT_COPY,
    getListOfAdmin: getAppointmentAdmins,
    getListOfCustomer: getAppointmentCustomers,
    getListOfPets: getAppointmentPets,
};

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

/**
 * Loads temporary appointment requests for the Dashboard.
 * @returns {Object[]} The initial booking request list.
 */
export { getInitialBookingRequests };
