import "../../../styles/owner-dashboard/mannage-customer-and-pet/CustomerList.css";

/**
 * Renders the searchable customer list and reports the selected customer.
 * @param {{customers: Object[], selectedCustomerId: number|string|null, searchQuery: string, onSearchChange: Function, onSelectCustomer: Function}} props Customer list data and handlers.
 * @returns {JSX.Element} The customer list panel.
 */
function CustomerList({ customers, selectedCustomerId, searchQuery, onSearchChange, onSelectCustomer }) {
    return (
        <div className="customerListContainer">
            <input
                className="customerSearch"
                type="search"
                aria-label="Search customers or pets"
                placeholder="Search customers or pets…"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
            />

            <div className="customerListRows">
                {customers.map((customer) => (
                    <button
                        key={customer.id}
                        type="button"
                        className={`customerContainer ${selectedCustomerId === customer.id ? "selected" : ""}`}
                        aria-pressed={selectedCustomerId === customer.id}
                        onClick={() => onSelectCustomer(customer.id)}
                    >
                        <span className="profilePic" aria-hidden="true">{customer.initials}</span>
                        <span className="customerListText">
                            <span className="customerName">{customer.name}</span>
                            <span className="customerPetNameType">
                                {customer.pets.map((pet) => `${pet.name} (${pet.breed})`).join(", ")}
                            </span>
                        </span>
                    </button>
                ))}
                {customers.length === 0 && (
                    <p className="customerListEmpty">No customers or pets match this search.</p>
                )}
            </div>
        </div>
    );
}

/**
 * Exports the CustomerList component.
 * @returns {Function} The customer list component.
 */
export default CustomerList;