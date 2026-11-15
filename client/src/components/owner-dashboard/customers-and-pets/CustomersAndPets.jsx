import { useState } from "react";
import PageHeader from "../../parent-component/PageHeader";
import CustomerList from "./CustomerList";
import CustomerProfile from "./CustomerProfile";
import HomeAccessInstruction from "./HomeAccessInstruction";
import PetsProfile from "./PetsProfile";
import { AddCustomerButton } from "../../action-button/AddCustomerButton";
import {
    createCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomers,
    getPetsByCustomer,
    toggleExtraTask,
    updateCustomer,
} from "../../../services/customer-dashboard/customer-service";
import "../../../styles/owner-dashboard/mannage-customer-and-pet/CustomerAndPet.css";

/**
 * Renders the owner customer list and the selected customer's details.
 * @returns {JSX.Element} The customers and pets page.
 */
export default function CustomersAndPets() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCustomerId, setSelectedCustomerId] = useState(() => getCustomers("")[0]?.id ?? null);
    const [, setDataRevision] = useState(0);
    const customers = getCustomers(searchQuery);
    const selectedCustomer = selectedCustomerId === null ? null : getCustomerById(selectedCustomerId);

    function refreshCustomerData() {
        setDataRevision((revision) => revision + 1);
    }

    function handleSearchChange(query) {
        setSearchQuery(query);
        const matchingCustomers = getCustomers(query);
        if (!matchingCustomers.some((customer) => customer.id === selectedCustomerId)) {
            setSelectedCustomerId(matchingCustomers[0]?.id ?? null);
        }
    }

    function handleUpdateCustomer(id, data) {
        const updatedCustomer = updateCustomer(id, data);
        if (updatedCustomer) {
            refreshCustomerData();
        }
        return updatedCustomer;
    }

    function handleDeleteCustomer(id) {
        if (!deleteCustomer(id)) {
            return false;
        }
        const remainingCustomers = getCustomers(searchQuery);
        setSelectedCustomerId(remainingCustomers[0]?.id ?? null);
        refreshCustomerData();
        return true;
    }

    function handleCreateCustomer(data) {
        const customer = createCustomer(data);
        if (!customer) {
            return null;
        }
        setSearchQuery("");
        setSelectedCustomerId(customer.id);
        refreshCustomerData();
        return customer;
    }

    function handleToggleTask(customerId, taskId, checked) {
        if (toggleExtraTask(customerId, taskId, checked)) {
            refreshCustomerData();
        }
    }

    return (
        <>
            <PageHeader
                title="Customers & Pets"
                subtitle="Everything customers share about their pets and home."
                actionButton={<AddCustomerButton onCreateCustomer={handleCreateCustomer} />}
            />
            <div className="customerPetContainer">
                <aside>
                    <CustomerList
                        customers={customers}
                        selectedCustomerId={selectedCustomerId}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSelectCustomer={setSelectedCustomerId}
                    />
                </aside>
                <section className="column" aria-label="Customer and pet details">
                    {selectedCustomer ? (
                        <>
                            <CustomerProfile
                                key={selectedCustomer.id}
                                customer={selectedCustomer}
                                onUpdate={handleUpdateCustomer}
                                onDelete={handleDeleteCustomer}
                            />
                            <HomeAccessInstruction customer={selectedCustomer} onToggleTask={handleToggleTask} />
                            <PetsProfile pets={getPetsByCustomer(selectedCustomer.id)} />
                        </>
                    ) : (
                        <div className="customerDetailsEmpty" role="status">
                            No customer selected. Try another search.
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}