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
    updatePetCareNotes,
} from "../../../services/customer-dashboard/customer-service";
import { recordPetCareUpdate } from "../../../services/owner-dashboard/audit-log-service";
import "../../../styles/owner-dashboard/mannage-customer-and-pet/CustomerAndPet.css";


/**
 * Displays the searchable customer list and the selected customer's details.
 * @param {{readOnly?: boolean, canEditPetCareNotes?: boolean}} "props" Customer and pet editing options.
 * @returns {JSX.Element} The customers and pets page.
 */
export default function CustomersAndPets({
    readOnly = false,
    canEditPetCareNotes = false,
}) {
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

    function handleSavePetCareNotes(petId, data) {
        const updatedPet = updatePetCareNotes(petId, data);
        if (!updatedPet) return false;

        // Change this part once backend is up.
        recordPetCareUpdate("Bobby", "Bobby P.", updatedPet.name);
        refreshCustomerData();
        return true;
    }

    return (
        <>
            <PageHeader
                title="Customers & Pets"
                subtitle="Everything customers share about their pets and home."
                actionButton={
                    readOnly ? null : <AddCustomerButton onCreateCustomer={handleCreateCustomer} />
                }
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
                                readOnly={readOnly}
                                onUpdate={readOnly ? undefined : handleUpdateCustomer}
                                onDelete={readOnly ? undefined : handleDeleteCustomer}
                            />
                            <HomeAccessInstruction customer={selectedCustomer} onToggleTask={handleToggleTask} />
                            <PetsProfile
                                pets={getPetsByCustomer(selectedCustomer.id)}
                                onSavePetCareNotes={canEditPetCareNotes ? handleSavePetCareNotes : undefined}
                            />
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