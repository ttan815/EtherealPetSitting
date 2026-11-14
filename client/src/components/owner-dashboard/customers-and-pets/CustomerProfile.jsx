import { useId, useState } from "react";
import ManageCustomerPopup from "../../popup/ManageCustomerPopup";
import "../../../styles/owner-dashboard/mannage-customer-and-pet/CustomerProfile.css";

/**
 * Shows the selected customer's contact details and edit/delete actions.
 * @param {{customer: Object, onUpdate: Function, onDelete: Function}} props Customer data and update handlers.
 * @returns {JSX.Element} The customer profile and its dialogs.
 */
function CustomerProfile({ customer, onUpdate, onDelete }) {
    const deleteDialogId = useId();
    const [editStatus, setEditStatus] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);

    function handleDelete() {
        if (onDelete(customer.id)) {
            setDeleteStatus(false);
        }
    }

    return (
        <>
            {editStatus && (
                <ManageCustomerPopup
                    mode="edit"
                    customer={customer}
                    onSave={onUpdate}
                    onClose={() => setEditStatus(false)}
                />
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
                            <button className="deleteCustomerConfirm" type="button" onClick={handleDelete}>
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
                        <button className="customerEditButton" type="button" onClick={() => setEditStatus(true)}>
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
