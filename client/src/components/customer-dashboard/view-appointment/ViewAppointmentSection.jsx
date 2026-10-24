import { useState } from "react"
import ViewAppointmentHeader from "./ViewAppointmentHeader";
import "../../../styles/customer-dashboard/view-appointment/ViewAppointmentSection.css"
import UpcomingVisitButton from "./UpcomingVisitButton";
import AppointmentTable from "./AppointmentTable"
import AppointmentDetail from "./appointment-detail/AppointmentDetail";

function MainContent( {setCurrentView, setAppointmentId} ) {
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
            <AppointmentTable appointments={appointments} setCurrentView={setCurrentView} setAppointmentId={setAppointmentId}/>
        </section>
    );
}

function Detail( {setCurrentView, appointmentId} ) {
    return (
        <AppointmentDetail setCurrentView={setCurrentView} appointmentId={appointmentId}/>
    );
}

function ViewAppointmentSection() {
    const [currentView, setCurrentView] = useState("main");
    const [appointmentId, setAppointmentId] = useState("");

    if(currentView === "main")
        return <MainContent setCurrentView={setCurrentView} setAppointmentId={setAppointmentId}/>;
    else if(currentView === "appointment-detail")
        return <Detail setCurrentView={setCurrentView} appointmentId={appointmentId}/>;
}

export default ViewAppointmentSection;