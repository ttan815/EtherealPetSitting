import ViewAppointmentSection from "../components/customer-dashboard/view-appointment/ViewAppointmentSection";
import ManagePet from "../components/customer-dashboard/manage-pet/ManagePet"
import "../styles/customer-dashboard/CustomerDashboard.css"

function CustomerDashboard() {
    return (
        <main>
            {/*Navigation Bar*/}
            
            {/* Section */}
            <ManagePet/>

        </main>
    );
}

export default CustomerDashboard;