import "../styles/owner-dashboard/mannage-customer-and-pet/CustomerAndPet.css";
import CustomerList from "../components/owner-dashboard/customers-and-pets/CustomerList";
import CustomerProfile from "../components/owner-dashboard/customers-and-pets/CustomerProfile";
import HomeAccessInstruction from "../components/owner-dashboard/customers-and-pets/HomeAccessInstruction";
import PetsProfile from "../components/owner-dashboard/customers-and-pets/PetsProfile";
import PageHeader from "../components/parent-component/PageHeader";

/**
 * Renders the customer and pet information page.
 * @returns {JSX.Element} The customer-and-pets page.
 */
function CustomerAndPet() {
    return (
        <>
            <div className="customerDashboardHeader">
                <PageHeader
                    title="Customers & Pets"
                    subtitle="Everything customers share about their pets and home."
                />
            </div>
            <div className="customerPetContainer">
                <div className="column">
                    <CustomerList></CustomerList>
                </div>
                <div className="column">
                    <CustomerProfile></CustomerProfile>
                    <HomeAccessInstruction></HomeAccessInstruction>
                    <PetsProfile></PetsProfile>
                </div>
            </div>
        </>
    )
}

export default CustomerAndPet;