// Renders the Manage Personal Information section of the customer dashboard.
import { useCallback, useState } from "react";
import PageHeader from "../../parent-component/PageHeader";
import ProfileCard from "./ProfileCard";
import PersonalDetailsForm from "./PersonalDetailsForm";
import PasswordSecurity from "./PasswordSecurity";
import ChangePasswordModal from "./ChangePasswordModal";
import SavedToast from "./SavedToast";
import { PERSONAL_DETAILS_FIELD_NAMES } from "../../../constants/customer/personal-info";
import {
    changeCustomerPassword,
    getCustomerProfile,
    updateCustomerProfile,
} from "../../../services/customer-dashboard/customer-service";
import "../../../styles/customer-dashboard/manage-personal-info/ManagePersonalInfo.css";

/**
 * Renders the customer's personal information with their current details already loaded.
 * @returns {JSX.Element} The Manage Personal Information section.
 */
export default function ManagePersonalInfo() {
    // Saved values (what the profile card shows). TODO: load the logged-in customer from the API.
    const [customer, setCustomer] = useState(getCustomerProfile);
    // Values being typed in the form before "Save changes".
    const [draft, setDraft] = useState(getCustomerProfile);
    const [editingFields, setEditingFields] = useState([]);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    function handleChange(name, value) {
        setDraft((prev) => ({ ...prev, [name]: value }));
    }

    function handleEditField(name) {
        setEditingFields((prev) => (prev.includes(name) ? prev : [...prev, name]));
    }

    function handleEditAll() {
        setEditingFields(PERSONAL_DETAILS_FIELD_NAMES);
    }

    function handleSave() {
        const updatedCustomer = updateCustomerProfile(draft);
        setCustomer(updatedCustomer);
        setDraft(updatedCustomer);
        setEditingFields([]);
        setToastMessage("Changes saved");
    }

    function handlePasswordUpdate() {
        const updatedCustomer = changeCustomerPassword();
        setPasswordOpen(false);
        setCustomer(updatedCustomer);
        setDraft(updatedCustomer);
        setToastMessage("Password changed");
    }

    const closePassword = useCallback(() => setPasswordOpen(false), []);
    const hideToast = useCallback(() => setToastMessage(""), []);

    return (
        <section className="personal-info">
            <PageHeader
                title="Manage personal information"
                subtitle="Keep your contact, home, and emergency details accurate and secure."
                actionLabel="Save changes"
                onAction={handleSave}
            />

            <div className="personal-info-grid">
                <ProfileCard customer={customer} />

                <div className="personal-info-main">
                    <PersonalDetailsForm
                        values={draft}
                        verified={customer.verified}
                        editingFields={editingFields}
                        onChange={handleChange}
                        onEditField={handleEditField}
                        onEditAll={handleEditAll}
                    />
                    <PasswordSecurity
                        lastChanged={customer.passwordLastChanged}
                        onChangePassword={() => setPasswordOpen(true)}
                    />
                </div>
            </div>

            <ChangePasswordModal
                open={passwordOpen}
                onCancel={closePassword}
                onUpdate={handlePasswordUpdate}
            />
            <SavedToast show={Boolean(toastMessage)} message={toastMessage} onClose={hideToast} />
        </section>
    );
}