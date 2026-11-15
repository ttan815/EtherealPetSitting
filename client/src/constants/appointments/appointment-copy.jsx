/**
 * Configurable UI copy used by the new-appointment popup.
 * @type {Object}
 */
export const NEW_APPOINTMENT_COPY = {
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

/**
 * Represents the owner as an appointment admin option.
 * @type {{id: string, label: string}}
 */
export const OWNER_APPOINTMENT_OPTION = {
    id: "owner",
    label: NEW_APPOINTMENT_COPY.ownerLabel,
};

/** @type {string} Locale used to format appointment dates. */
export const APPOINTMENT_DATE_LOCALE = "en-US";
/** @type {Intl.DateTimeFormatOptions} Month format for appointment date tiles. */
export const APPOINTMENT_MONTH_FORMAT_OPTIONS = { month: "short" };
/** @type {Intl.DateTimeFormatOptions} Day format for appointment date tiles. */
export const APPOINTMENT_DAY_FORMAT_OPTIONS = { day: "2-digit" };
/** @type {Intl.DateTimeFormatOptions} Weekday format for appointment date tiles. */
export const APPOINTMENT_WEEKDAY_FORMAT_OPTIONS = { weekday: "long" };
/** @type {Intl.DateTimeFormatOptions} Long date format for appointment details. */
export const APPOINTMENT_LONG_DATE_FORMAT_OPTIONS = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
};
