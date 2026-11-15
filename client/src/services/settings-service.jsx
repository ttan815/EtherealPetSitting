const SAMPLE_SETTINGS = {
    info: {
        name: "Ethereal Pet Sitting & Care",
        email: "hello@example.com",
        phone: "(555) 555-0123",
        instagram: "",
        facebook: "",
    },
    services: [
        { id: "drop-in", name: "Drop-in Care", enabled: true, price: "25" },
        { id: "whole-day", name: "Whole Day Care", enabled: true, price: "25" },
        { id: "overnight", name: "Overnight Stays", enabled: true, price: "25" },
        { id: "dog-walking", name: "Dog Walking", enabled: true, price: "25" },
        { id: "grooming", name: "Grooming Care", enabled: true, price: "25" },
        { id: "medication", name: "Medication", enabled: true, price: "25" },
    ],
    deposits: [
        { days: 30, amount: "20" },
        { days: 60, amount: "50" },
        { days: 90, amount: "100" },
    ],
    notifications: {
        newBookings: true,
        rescheduled: true,
        cancelled: true,
        serviceUpdates: true,
        newReviews: true,
        weeklyEarnings: false,
    },
};

let currentSettings = structuredClone(SAMPLE_SETTINGS);

/**
 * Fetches temporary business settings.
 * @returns {Object} Business info, services, deposits and notification settings.
 */
export function getSettings() {
    return structuredClone(currentSettings);
}

/**
 * Saves temporary business settings.
 * @param {Object} settings Updated business settings.
 * @returns {boolean} Whether the settings were accepted.
 */
export function saveSettings(settings) {
    if (!settings || !settings.info || !Array.isArray(settings.services) || !Array.isArray(settings.deposits)) {
        return false;
    }
    currentSettings = structuredClone(settings);
    return true;
}
