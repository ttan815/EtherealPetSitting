import "../../../styles/owner-dashboard/mannage-customer-and-pet/CustomerProfile.css";
import { useId, useState } from "react";

/**
 * Shows the selected customer's contact details and edit/delete dialogs.
 * @param {{customer: Object, onUpdate: Function, onDelete: Function, onAddPet: Function}} props Customer data and update handlers.
 * @returns {JSX.Element} The customer profile and its dialogs.
 */
function CustomerProfile({ customer, onUpdate, onDelete, onAddPet }) {
    const editDialogId = useId();
    const deleteDialogId = useId();
    const [editStatus, setEditStatus] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isAddingPet, setIsAddingPet] = useState(false);
    const [newPetName, setNewPetName] = useState("");
    const [newPetBreed, setNewPetBreed] = useState("");

    function openEditDialog() {
        setFormData({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            homeAccessNote: customer.homeAccessNote,
        });
        setIsAddingPet(false);
        setEditStatus(true);
    }

    function handleFieldChange(field, value) {
        setFormData((current) => ({ ...current, [field]: value }));
    }

    function handleSave(event) {
        event.preventDefault();
        const updatedFormData = {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
        };
        if (!updatedFormData.firstName || !updatedFormData.lastName) {
            return;
        }
        if (onUpdate(customer.id, updatedFormData)) {
            setEditStatus(false);
        }
    }

    function handleAddPet() {
        if (!newPetName.trim() || !newPetBreed.trim()) {
            return;
        }
        onAddPet(customer.id, { name: newPetName, breed: newPetBreed });
        setNewPetName("");
        setNewPetBreed("");
        setIsAddingPet(false);
    }

    return (
        <>
            {editStatus && formData && (
                <div className="editCustomerOverlay">
                    <div className="editCustomerModal" role="dialog" aria-modal="true" aria-labelledby={editDialogId}>
                        <div className="editCustomerHeader">
                            <div className="editCustomerIcon" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="3.5" />
                                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                </svg>
                            </div>
                            <div>
                                <h2 id={editDialogId}>Edit Customer</h2>
                                <p>Update {customer.name}&apos;s contact details and home notes.</p>
                            </div>
                            <button
                                className="editCustomerClose"
                                type="button"
                                aria-label="Close edit customer dialog"
                                onClick={() => setEditStatus(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form className="editCustomerForm" onSubmit={handleSave}>
                            <div className="editCustomerFormRow">
                                <div className="editCustomerField">
                                    <label htmlFor={`${editDialogId}-first-name`}>First name</label>
                                    <input
                                        id={`${editDialogId}-first-name`}
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(event) => handleFieldChange("firstName", event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="editCustomerField">
                                    <label htmlFor={`${editDialogId}-last-name`}>Last name</label>
                                    <input
                                        id={`${editDialogId}-last-name`}
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(event) => handleFieldChange("lastName", event.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="editCustomerFormRow">
                                <div className="editCustomerField">
                                    <label htmlFor={`${editDialogId}-email`}>Email</label>
                                    <input
                                        id={`${editDialogId}-email`}
                                        type="email"
                                        value={formData.email}
                                        onChange={(event) => handleFieldChange("email", event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="editCustomerField">
                                    <label htmlFor={`${editDialogId}-phone`}>Phone</label>
                                    <input
                                        id={`${editDialogId}-phone`}
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(event) => handleFieldChange("phone", event.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="editCustomerField">
                                <label htmlFor={`${editDialogId}-address`}>Address</label>
                                <input
                                    id={`${editDialogId}-address`}
                                    type="text"
                                    value={formData.address}
                                    onChange={(event) => handleFieldChange("address", event.target.value)}
                                    required
                                />
                            </div>

                            <div className="editCustomerField">
                                <label htmlFor={`${editDialogId}-home-access`}>
                                    Home access notes
                                    <span className="editCustomerOptional">Optional</span>
                                </label>
                                <textarea
                                    id={`${editDialogId}-home-access`}
                                    value={formData.homeAccessNote}
                                    onChange={(event) => handleFieldChange("homeAccessNote", event.target.value)}
                                />
                            </div>

                            <div className="editCustomerPets">
                                <span className="editCustomerPetsLabel">Pets</span>
                                {customer.pets.map((pet) => (
                                    <span className="editCustomerPetTag" key={pet.id}>
                                        {pet.name} · {pet.breed}
                                    </span>
                                ))}
                                <button
                                    className="editCustomerAddPet"
                                    type="button"
                                    onClick={() => {
                                        setIsAddingPet((current) => !current);
                                        setNewPetName("");
                                        setNewPetBreed("");
                                    }}
                                >
                                    {isAddingPet ? "Cancel add" : "+ Add pet"}
                                </button>
                            </div>

                            {isAddingPet && (
                                <div className="editCustomerFormRow">
                                    <div className="editCustomerField">
                                        <label htmlFor={`${editDialogId}-pet-name`}>Pet name</label>
                                        <input
                                            id={`${editDialogId}-pet-name`}
                                            value={newPetName}
                                            onChange={(event) => setNewPetName(event.target.value)}
                                        />
                                    </div>
                                    <div className="editCustomerField">
                                        <label htmlFor={`${editDialogId}-pet-breed`}>Breed</label>
                                        <input
                                            id={`${editDialogId}-pet-breed`}
                                            value={newPetBreed}
                                            onChange={(event) => setNewPetBreed(event.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="editCustomerSave"
                                        type="button"
                                        disabled={!newPetName.trim() || !newPetBreed.trim()}
                                        onClick={handleAddPet}
                                    >
                                        Save pet
                                    </button>
                                </div>
                            )}

                            <div className="editCustomerActions">
                                <button className="editCustomerCancel" type="button" onClick={() => setEditStatus(false)}>
                                    Cancel
                                </button>
                                <button className="editCustomerSave" type="submit">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteStatus && (
                <div className="deleteCustomerOverlay">
                    <div className="deleteCustomerModal" role="dialog" aria-modal="true" aria-labelledby={`${deleteDialogId}-title`}>
                        <div className="deleteCustomerHeader">
                            <div className="deleteCustomerIcon" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18" />
                                    <path d="M9 6V3h6v3" />
                                    <path d="M6 6l1 15h10l1-15" />
                                    <path d="M10 10v7M14 10v7" />
                                </svg>
                            </div>
                            <div className="deleteCustomerText">
                                <h2 id={`${deleteDialogId}-title`}>Delete {customer.name}?</h2>
                                <p>This removes the customer profile, pets, and visit history from the temporary list.</p>
                            </div>
                            <button
                                className="deleteCustomerClose"
                                type="button"
                                aria-label="Close delete customer dialog"
                                onClick={() => setDeleteStatus(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="deleteCustomerActions">
                            <button className="deleteCustomerCancel" type="button" onClick={() => setDeleteStatus(false)}>
                                Cancel
                            </button>
                            <button
                                className="deleteCustomerConfirm"
                                type="button"
                                onClick={() => onDelete(customer.id)}
                            >
                                Delete customer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="customerInformationContainer">
                <div className="customerInformationHeader">
                    <div className="customerIdentity">
                        <span className="customerAvatar" aria-hidden="true">{customer.initials}</span>
                        <div>
                            <h2 className="customerFullName">{customer.name}</h2>
                            <p className="customerSince">
                                Customer since {customer.since} · {customer.visits} visits
                            </p>
                        </div>
                    </div>
                    <div className="customerActions">
                        <span className="customerRole">{customer.role}</span>
                        <button className="customerEditButton" type="button" onClick={openEditDialog}>
                            Edit
                        </button>
                        <button className="customerDeleteButton" type="button" onClick={() => setDeleteStatus(true)}>
                            Delete
                        </button>
                    </div>
                </div>

                <div className="customerContactInformation">
                    <div className="customerContactItem">
                        <span className="customerContactIcon" aria-hidden="true">☎</span>
                        <div>
                            <p className="customerContactLabel">Phone</p>
                            <p className="customerContactValue">{customer.phone}</p>
                        </div>
                    </div>
                    <div className="customerContactItem">
                        <span className="customerContactIcon" aria-hidden="true">✉</span>
                        <div>
                            <p className="customerContactLabel">Email</p>
                            <p className="customerContactValue">{customer.email}</p>
                        </div>
                    </div>
                    <div className="customerContactItem">
                        <span className="customerContactIcon" aria-hidden="true">⌖</span>
                        <div>
                            <p className="customerContactLabel">Address</p>
                            <p className="customerContactValue">{customer.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/**
 * Exports the CustomerProfile component.
 * @returns {Function} The customer profile component.
 */
export default CustomerProfile;
