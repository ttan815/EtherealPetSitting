import { useState } from "react"
import ViewAppointmentHeader from "./ViewAppointmentHeader";
import "../../../styles/customer-dashboard/view-appointment/ViewAppointmentSection.css"
import UpcomingVisitButton from "./UpcomingVisitButton";
import AppointmentTable from "./AppointmentTable"
import AppointmentDetail from "./appointment-detail/AppointmentDetail";
import RescheduleAppointment from "./reschedule-appointment/RescheduleAppointment";

function MainContent( {setCurrentView, setAppointmentId, onReschedule} ) {
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
            <AppointmentTable
                appointments={appointments}
                setCurrentView={setCurrentView}
                setAppointmentId={setAppointmentId}
                onReschedule={onReschedule}
            />
        </section>
    );
}

function Detail( {setCurrentView, appointmentId, onReschedule} ) {
    return (
        <AppointmentDetail
            setCurrentView={setCurrentView}
            appointmentId={appointmentId}
            onReschedule={() => onReschedule(appointmentId, "appointment-detail")}
        />
    );
}

function ViewAppointmentSection() {
    const [currentView, setCurrentView] = useState("main");
    const [appointmentId, setAppointmentId] = useState("");
    const [previousView, setPreviousView] = useState("main");

    function handleReschedule(id, returnView) {
        setAppointmentId(`${id}`);
        setPreviousView(returnView);
        setCurrentView("reschedule");
    }

    if(currentView === "main")
        return (
            <MainContent
                setCurrentView={setCurrentView}
                setAppointmentId={setAppointmentId}
                onReschedule={(id) => handleReschedule(id, "main")}
            />
        );
    else if(currentView === "appointment-detail")
        return (
            <Detail
                setCurrentView={setCurrentView}
                appointmentId={appointmentId}
                onReschedule={handleReschedule}
            />
        );
    else if(currentView === "reschedule")
        return (
            <RescheduleAppointment
                appointmentId={appointmentId}
                onKeepAppointment={() => setCurrentView(previousView)}
                onViewAppointment={(id) => {
                    setAppointmentId(id);
                    setCurrentView("appointment-detail");
                }}
            />
        );
}

export default ViewAppointmentSection;