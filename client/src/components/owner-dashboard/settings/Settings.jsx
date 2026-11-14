// settings page, swapped in by the owner dashboard (no route of its own)
import { useEffect, useMemo, useState } from "react";
import SettingsHeader from "./SettingsHeader";
import BusinessInfo from "./BusinessInfo";
import ServicePrices from "./ServicePrices";
import Deposits from "./Deposits";
import NotificationSettings from "./NotificationSettings";
import "../../../styles/owner-dashboard/settings/Settings.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// sample data until the backend is ready
const SAMPLE_SETTINGS = {
    info: {
        name: "Ethereal Pet Sitting & Care",
        email: "hello@example.com",
        phone: "(555) 555-0123",
        instagram: "",
        facebook: "",
    },
    services: [
        { id: "drop-in", name: "Drop-in Care", enabled: true, price: "" },
        { id: "whole-day", name: "Whole Day Care", enabled: true, price: "" },
        { id: "overnight", name: "Overnight Stays", enabled: true, price: "" },
        { id: "dog-walking", name: "Dog Walking", enabled: true, price: "" },
        { id: "grooming", name: "Grooming Care", enabled: true, price: "" },
        { id: "medication", name: "Medication", enabled: true, price: "" },
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

/**
 * Gets the saved business settings.
 * @returns {Object} The { info, services, deposits, notifications } settings.
 */
export function getSettings() {
    // TODO: replace with backend call
    const temp = structuredClone(SAMPLE_SETTINGS);
    return temp;
}

/**
 * Saves the business settings.
 * @param {Object} settings The { info, services, deposits, notifications } settings.
 * @returns {boolean} True when the settings were saved.
 */
export function saveSettings(settings) {
    // TODO: replace with backend call
    const temp = Boolean(settings);
    return temp;
}

/**
 * Checks every field and returns error messages for anything invalid.
 * @param {Object} settings The settings being edited.
 * @returns {Object} Errors grouped as { info, services, deposits }.
 */
function validate(settings) {
    const errors = { info: {}, services: {}, deposits: {} };
    const { info } = settings;

    if (!info.name.trim()) errors.info.name = "Please enter a business name.";
    if (!EMAIL_PATTERN.test(info.email.trim())) errors.info.email = "Please enter a valid email.";
    if (info.phone.replace(/\D/g, "").length < 10) errors.info.phone = "Please enter a 10 digit phone number.";
    ["instagram", "facebook"].forEach((field) => {
        const link = info[field].trim();
        if (link && !/^https?:\/\//i.test(link)) errors.info[field] = "Links should start with https://";
    });

    settings.services.forEach((service) => {
        if (service.enabled && service.price !== "" && Number(service.price) <= 0) {
            errors.services[service.id] = "Price must be more than $0.";
        }
    });

    settings.deposits.forEach((deposit) => {
        if (deposit.amount === "") errors.deposits[deposit.days] = "Enter a deposit amount.";
    });

    return errors;
}

/**
 * Tells if the errors object has any messages in it.
 * @param {Object} errors Errors grouped as { info, services, deposits }.
 * @returns {boolean} True when there is at least one error.
 */
function hasErrors(errors) {
    return Object.values(errors).some((group) => Object.keys(group).length > 0);
}

/**
 * Renders the settings page with business info, services and prices, deposits, and notifications.
 * @returns {JSX.Element} The settings page.
 */
export default function Settings() {
    const [saved, setSaved] = useState(getSettings);
    const [draft, setDraft] = useState(getSettings);
    const [showErrors, setShowErrors] = useState(false);
    const [toast, setToast] = useState("");

    // hide the toast after a few seconds
    useEffect(() => {
        if (!toast) return undefined;
        const timer = setTimeout(() => setToast(""), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const errors = useMemo(() => validate(draft), [draft]);
    const isDirty = JSON.stringify(draft) !== JSON.stringify(saved);
    const shownErrors = showErrors ? errors : { info: {}, services: {}, deposits: {} };

    function updateSection(section, value) {
        setDraft((prev) => ({ ...prev, [section]: value }));
    }

    function handleSave() {
        if (hasErrors(errors)) {
            setShowErrors(true);
            setToast("Please fix the highlighted fields");
            return;
        }
        if (saveSettings(draft)) {
            setSaved(draft);
            setShowErrors(false);
            setToast("Changes saved");
        }
    }

    return (
        <section className="st-page">
            <SettingsHeader onSave={handleSave} canSave={isDirty} />

            <div className="st-grid">
                <div className="st-column">
                    <BusinessInfo info={draft.info} errors={shownErrors.info} onChange={(v) => updateSection("info", v)} />
                    <ServicePrices services={draft.services} errors={shownErrors.services} onChange={(v) => updateSection("services", v)} />
                </div>
                <div className="st-column">
                    <Deposits deposits={draft.deposits} errors={shownErrors.deposits} onChange={(v) => updateSection("deposits", v)} />
                    <NotificationSettings settings={draft.notifications} onChange={(v) => updateSection("notifications", v)} />
                </div>
            </div>

            {/* TODO: reusable toast component not available */}
            {toast && <div className="st-toast" role="status">{toast}</div>}
        </section>
    );
}
