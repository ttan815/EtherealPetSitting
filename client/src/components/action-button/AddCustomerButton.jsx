import { useState } from "react";
import ManageCustomerPopup from "../popup/ManageCustomerPopup";
import "../../styles/owner-dashboard/mannage-customer-and-pet/AddCustomerButton.css";

/**
 * Renders the Add Customer action and opens the shared customer form.
 * @param {{onCreateCustomer: Function}} props Callback for saving a new customer.
 * @returns {JSX.Element} The Add Customer button and popup.
 */
export function AddCustomerButton({ onCreateCustomer }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSave(customerData) {
        const customer = onCreateCustomer(customerData);
        if (customer) {
            setIsOpen(false);
        }
        return customer;
    }

    return (
        <>
            <button
                type="button"
                className="owner-only-button-add-customer"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
            >
                <span className="book-an-appointment">+ Add customer</span>
            </button>
            {isOpen && (
                <ManageCustomerPopup
                    mode="add"
                    onSave={handleSave}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}