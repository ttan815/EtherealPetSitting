import "../styles/customer-dashboard/CustomerAndPet.css";
import CustomerList from "../components/customer-dashboard/CustomerList";
import CustomerProfile from "../components/customer-dashboard/CustomerProfile";
import HomeAccessInstruction from "../components/customer-dashboard/HomeAccessInstruction";
import PetsProfile from "../components/customer-dashboard/PetsProfile";
import PageHeader from "../components/customer-dashboard/PageHeader";
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