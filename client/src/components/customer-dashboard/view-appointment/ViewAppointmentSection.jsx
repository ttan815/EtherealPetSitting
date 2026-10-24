import { useState } from "react"
import ViewAppointmentHeader from "./ViewAppointmentHeader";
import "../../../styles/customer-dashboard/view-appointment/ViewAppointmentSection.css"
import UpcomingVisitButton from "./UpcomingVisitButton";
import AppointmentTable from "./AppointmentTable"
import AppointmentDetail from "./appointment-detail/AppointmentDetail";

function MainContent( {setCurrentView} ) {
    const [appointments, setAppointments] = useState([]);
    const [activeFilter, setActiveFilter] = useState("upcoming");

    return (
        <section className="view-appointment-section">
            <ViewAppointmentHeader/>
            
            {/* Filter Option */}
            <div className="tab-filter-navigation">
                <UpcomingVisitButton 
                    onAppointmentsLoaded={setAppointments}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
            </div>

            {/* Appointments table*/}
            <AppointmentTable appointments={appointments} setCurrentView={setCurrentView}/>
        </section>
    );
}

function Detail( {setCurrentView} ) {
    return (
        <AppointmentDetail setCurrentView={setCurrentView}/>
    );
}

function ViewAppointmentSection() {
    const [currentView, setCurrentView] = useState("main");

    if(currentView === "main")
        return <MainContent setCurrentView={setCurrentView} />;
    else if(currentView === "appointment-detail")
        return <Detail setCurrentView={setCurrentView}/>;
}

export default ViewAppointmentSection;