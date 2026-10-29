import { useState } from "react"
import ViewAppointmentHeader from "./ViewAppointmentHeader";
import PastVisitButton from "./PastVisitButton";
import "../../../styles/customer-dashboard/view-appointment/ViewAppointmentSection.css"
import UpcomingVisitButton from "./UpcomingVisitButton";
import AppointmentTable from "./AppointmentTable"
import AppointmentDetail from "./appointment-detail/AppointmentDetail";
import RescheduleAppointment from "./reschedule-appointment/RescheduleAppointment";

function MainContent({ activeFilter, setActiveFilter, setCurrentView, setAppointmentId, onReschedule }) {
    const [appointments, setAppointments] = useState([]);

    return (
        <section className="view-appointment-section">
            <ViewAppointmentHeader />

            {/* Filter Option */}
            <div className="tab-filter-navigation">
                <UpcomingVisitButton
                    onAppointmentsLoaded={setAppointments}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
                <PastVisitButton
                    onAppointmentsLoaded={setAppointments}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
            </div>

            {/* Appointments table*/}
            <AppointmentTable
                activeFilter={activeFilter}
                appointments={appointments}
                setCurrentView={setCurrentView}
                setAppointmentId={setAppointmentId}
                onReschedule={onReschedule}
            />
        </section>
    );
}

function Detail({ activeFilter, setCurrentView, appointmentId, onReschedule }) {
    return (
        <AppointmentDetail
            activeFilter={activeFilter}
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
    const [activeFilter, setActiveFilter] = useState("upcoming");

    function handleReschedule(id, returnView) {
        setAppointmentId(`${id}`);
        setPreviousView(returnView);
        setCurrentView("reschedule");
    }

    if (currentView === "main")
        return (
            <MainContent
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                setCurrentView={setCurrentView}
                setAppointmentId={setAppointmentId}
                onReschedule={(id) => handleReschedule(id, "main")}
            />
        );
    else if (currentView === "appointment-detail")
        return (
            <Detail
                activeFilter={activeFilter}
                setCurrentView={setCurrentView}
                appointmentId={appointmentId}
                onReschedule={handleReschedule}
            />
        );
    else if (currentView === "reschedule")
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