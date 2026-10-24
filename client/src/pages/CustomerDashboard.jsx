import AppointmentTable from "../components/AppointmentTable"
import ViewAppointmentSection from "../components/ViewAppointmentSection";
import "../styles/CustomerDashboard.css"

function CustomerDashboard() {
    return (
        <main>
            {/*Navigation Bar*/}
            
            <ViewAppointmentSection/>
            <AppointmentTable/>
        </main>
    );
}

export default CustomerDashboard;