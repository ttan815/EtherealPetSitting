import { useId, useState } from "react";
import { EMPTY_MANAGED_CUSTOMER, EMPTY_MANAGED_PET } from "../../constants/customer-forms";
import "../../styles/owner-dashboard/mannage-customer-and-pet/CustomerProfile.css";

function getCustomerForm(customer, isAddMode) {
    if (isAddMode) {
        return { ...EMPTY_MANAGED_CUSTOMER };
    }
    return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        homeAccessNote: customer.homeAccessNote || "",
    };
}

function getPetForms(customer, isAddMode) {
    if (isAddMode || !customer?.pets?.length) {
        return [{ ...EMPTY_MANAGED_PET }];
    }
    return customer.pets.map((pet) => ({ ...pet }));
}

/**
 * Renders the shared Add Customer and Edit Customer form.
 * @param {{mode: "add"|"edit", customer?: Object, onSave: Function, onClose: Function}} props Popup mode, customer data, and save handlers.
 * @returns {JSX.Element} The customer form dialog.
 */
export default function ManageCustomerPopup({ mode, customer, onSave, onClose }) {
    const dialogId = useId();
    const isAddMode = mode === "add";
    const [formData, setFormData] = useState(() => getCustomerForm(customer, isAddMode));
    const [petForms, setPetForms] = useState(() => getPetForms(customer, isAddMode));
    const [validationMessage, setValidationMessage] = useState("");

    function handleCustomerFieldChange(field, value) {
        setFormData((current) => ({ ...current, [field]: value }));
        setValidationMessage("");
    }

    function handlePetFieldChange(index, field, value) {
        setPetForms((current) => current.map((pet, petIndex) => (
            petIndex === index ? { ...pet, [field]: value } : pet
        )));
        setValidationMessage("");
    }

    function handleAddPet() {
        setPetForms((current) => [...current, { ...EMPTY_MANAGED_PET }]);
        setValidationMessage("");
    }

    function handleRemovePet(index) {
        setPetForms((current) => current.filter((_, petIndex) => petIndex !== index));
        setValidationMessage("");
    }

    function validateForm() {
        const requiredFields = [
            ["First name", formData.firstName],
            ["Last name", formData.lastName],
            ["Phone", formData.phone],
            ["Email", formData.email],
            ["Address", formData.address],
        ];
        petForms.forEach((pet, index) => {
            requiredFields.push([`Pet ${index + 1} name`, pet.name]);
            requiredFields.push([`Pet ${index + 1} breed`, pet.breed]);
        });

        const missingFields = requiredFields
            .filter(([, value]) => !value.trim())
            .map(([label]) => label);
        if (missingFields.length) {
            return `Complete the required fields: ${missingFields.join(", ")}.`;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            return "Enter a valid email address.";
        }
        return "";
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setValidationMessage(validationError);
            return;
        }

        const customerData = {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            homeAccessNote: formData.homeAccessNote.trim(),
            pets: petForms.map((pet) => ({
                ...pet,
                name: pet.name.trim(),
                breed: pet.breed.trim(),
                age: pet.age.trim(),
                weight: pet.weight.trim(),
                allergies: pet.allergies.trim(),
            })),
        };
        const result = isAddMode
            ? onSave(customerData)
            : onSave(customer.id, customerData);

        if (!result) {
            setValidationMessage(`Unable to ${isAddMode ? "add" : "update"} this customer. Please try again.`);
            return;
        }
        onClose();
    }

    return (
        <div className="editCustomerOverlay">
            <div className="editCustomerModal" role="dialog" aria-modal="true" aria-labelledby={`${dialogId}-title`}>
                <div className="editCustomerHeader">
                    <div className="editCustomerIcon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                        </svg>
                    </div>
                    <div>
                        <h2 id={`${dialogId}-title`}>{isAddMode ? "Add Customer" : "Edit Customer"}</h2>
                        <p>
                            {isAddMode
                                ? "Enter the customer's contact details and pet information."
                                : `Update ${customer.name}'s contact details and pet information.`}
                        </p>
                    </div>
                    <button
                        className="editCustomerClose"
                        type="button"
                        aria-label={`Close ${isAddMode ? "Add" : "Edit"} Customer dialog`}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form className="editCustomerForm" noValidate onSubmit={handleSubmit}>
                    <div className="editCustomerFormRow">
                        <div className="editCustomerField">
                            <label htmlFor={`${dialogId}-first-name`}>First name <span aria-hidden="true">*</span></label>
                            <input
                                id={`${dialogId}-first-name`}
                                type="text"
                                value={formData.firstName}
                                aria-required="true"
                                onChange={(event) => handleCustomerFieldChange("firstName", event.target.value)}
                            />
                        </div>
                        <div className="editCustomerField">
                            <label htmlFor={`${dialogId}-last-name`}>Last name <span aria-hidden="true">*</span></label>
                            <input
                                id={`${dialogId}-last-name`}
                                type="text"
                                value={formData.lastName}
                                aria-required="true"
                                onChange={(event) => handleCustomerFieldChange("lastName", event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="editCustomerFormRow">
                        <div className="editCustomerField">
                            <label htmlFor={`${dialogId}-email`}>Email <span aria-hidden="true">*</span></label>
                            <input
                                id={`${dialogId}-email`}
                                type="email"
                                value={formData.email}
                                aria-required="true"
                                onChange={(event) => handleCustomerFieldChange("email", event.target.value)}
                            />
                        </div>
                        <div className="editCustomerField">
                            <label htmlFor={`${dialogId}-phone`}>Phone <span aria-hidden="true">*</span></label>
                            <input
                                id={`${dialogId}-phone`}
                                type="tel"
                                value={formData.phone}
                                aria-required="true"
                                onChange={(event) => handleCustomerFieldChange("phone", event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="editCustomerField">
                        <label htmlFor={`${dialogId}-address`}>Address <span aria-hidden="true">*</span></label>
                        <input
                            id={`${dialogId}-address`}
                            type="text"
                            value={formData.address}
                            aria-required="true"
                            onChange={(event) => handleCustomerFieldChange("address", event.target.value)}
                        />
                    </div>

                    <div className="editCustomerField">
                        <label htmlFor={`${dialogId}-home-access`}>
                            Home access notes
                            <span className="editCustomerOptional">Optional</span>
                        </label>
                        <textarea
                            id={`${dialogId}-home-access`}
                            value={formData.homeAccessNote}
                            onChange={(event) => handleCustomerFieldChange("homeAccessNote", event.target.value)}
                        />
                    </div>

                    <div className="editCustomerPets">
                        <span className="editCustomerPetsLabel">Pet details</span>
                        <button className="editCustomerAddPet" type="button" onClick={handleAddPet}>
                            + Add pet
                        </button>
                    </div>

                    {petForms.map((pet, index) => (
                        <div className="editCustomerPetFields" key={pet.id || index}>
                            <div className="customerPetEditorHeader">
                                <span className="editCustomerPetsLabel">Pet {index + 1}</span>
                                {petForms.length > 1 && (
                                    <button
                                        className="editCustomerRemovePet"
                                        type="button"
                                        onClick={() => handleRemovePet(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className="editCustomerFormRow">
                                <div className="editCustomerField">
                                    <label htmlFor={`${dialogId}-pet-name-${index}`}>Pet name <span aria-hidden="true">*</span></label>
                                    <input
                                        id={`${dialogId}-pet-name-${index}`}
                                        type="text"
                                        value={pet.name}
                                        aria-required="true"
                                        onChange={(event) => handlePetFieldChange(index, "name", event.target.value)}
                                    />
                                </div>
                                <div className="editCustomerField">
                                    <label htmlFor={`${dialogId}-pet-breed-${index}`}>Breed <span aria-hidden="true">*</span></label>
                                    <input
                                        id={`${dialogId}-pet-breed-${index}`}
                                        type="text"
                                        value={pet.breed}
                                        aria-required="true"
                                        onChange={(event) => handlePetFieldChange(index, "breed", event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="editCustomerFormRow">
                                <div className="editCustomerField">
                                    <label htmlFor={`${dialogId}-pet-age-${index}`}>Age</label>
                                    <input
                                        id={`${dialogId}-pet-age-${index}`}
                                        value={pet.age}
                                        onChange={(event) => handlePetFieldChange(index, "age", event.target.value)}
                                    />
                                </div>
                                <div className="editCustomerField">
                                    <label htmlFor={`${dialogId}-pet-weight-${index}`}>Weight</label>
                                    <input
                                        id={`${dialogId}-pet-weight-${index}`}
                                        value={pet.weight}
                                        onChange={(event) => handlePetFieldChange(index, "weight", event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="editCustomerField">
                                <label htmlFor={`${dialogId}-pet-allergies-${index}`}>Allergies</label>
                                <input
                                    id={`${dialogId}-pet-allergies-${index}`}
                                    value={pet.allergies}
                                    onChange={(event) => handlePetFieldChange(index, "allergies", event.target.value)}
                                />
                            </div>
                        </div>
                    ))}

                    {validationMessage && (
                        <p className="customerFormValidation" role="alert">
                            {validationMessage}
                        </p>
                    )}

                    <div className="editCustomerActions">
                        <button className="editCustomerCancel" type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="editCustomerSave" type="submit">
                            {isAddMode ? "Add customer" : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
