// Renders the view appointment section component.
import { useState } from "react"
import PastVisitButton from "./PastVisitButton";
import "../../../styles/customer-dashboard/view-appointment/ViewAppointmentSection.css"
import UpcomingVisitButton from "./UpcomingVisitButton";
import AppointmentTable from "./AppointmentTable"
import AppointmentDetail from "./appointment-detail/AppointmentDetail";
import RescheduleAppointment from "./reschedule-appointment/RescheduleAppointment";
import PageHeader from "../../parent-component/PageHeader";
import { useNavigate } from "react-router";
import { getAppointmentById } from "../../../services/owner-dashboard/appointment-service";

function MainContent({ activeFilter, setActiveFilter, setCurrentView, setAppointmentId, onReschedule }) {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    return (
        <section className="view-appointment-section">
            <PageHeader 
            title={"Appointments"} 
            subtitle={"See your upcoming visits and past care, and reschedule if plans change."} 
            actionLabel={"Book Appointment"} 
            onAction={() => navigate("/book-appointment")}
            />

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

function Detail({ setCurrentView, appointmentId, appointment, onReschedule }) {
    return (
        <AppointmentDetail
            setCurrentView={setCurrentView}
            appointmentId={appointmentId}
            appointment={appointment}
            onReschedule={() => onReschedule(appointmentId, "appointment-detail")}
        />
    );
}

/**
 * Renders the customer appointment section and its list/detail views.
 * @param {Object} props Initial view and appointment selection.
 * @param {string} [props.initialView="main"] The view displayed initially.
 * @param {string} [props.initialAppointmentId=""] The appointment selected initially.
 * @returns {JSX.Element} The appointment dashboard section.
 */
function ViewAppointmentSection({ initialView = "main", initialAppointmentId = "" }) {
    const [currentView, setCurrentView] = useState(initialView);
    const [appointmentId, setAppointmentId] = useState(initialAppointmentId);
    const [previousView, setPreviousView] = useState("main");
    const [activeFilter, setActiveFilter] = useState("upcoming");
    const appointment = currentView === "main" ? null : getAppointmentById(appointmentId);

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
                setCurrentView={setCurrentView}
                appointmentId={appointmentId}
                appointment={appointment}
                onReschedule={handleReschedule}
            />
        );
    else if (currentView === "reschedule")
        return (
            <RescheduleAppointment
                appointmentId={appointmentId}
                appointment={appointment}
                onKeepAppointment={() => setCurrentView(previousView)}
                onViewAppointment={(id) => {
                    setAppointmentId(id);
                    setCurrentView("appointment-detail");
                }}
            />
        );
}

export default ViewAppointmentSection;