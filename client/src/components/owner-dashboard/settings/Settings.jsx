// settings page, swapped in by the owner dashboard (no route of its own)
import { useEffect, useMemo, useState } from "react";
import SettingsHeader from "./SettingsHeader";
import BusinessInfo from "./BusinessInfo";
import Services from "./Services";
import Deposits from "./Deposits";
import NotificationSettings from "./NotificationSettings";
import { EMAIL_PATTERN } from "../../../constants/shared/validation";
import { getSettings, saveSettings } from "../../../services/owner-dashboard/settings-service";
import "../../../styles/owner-dashboard/settings/Settings.css";

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
                    <Services services={draft.services} errors={shownErrors.services} onChange={(v) => updateSection("services", v)} />
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
