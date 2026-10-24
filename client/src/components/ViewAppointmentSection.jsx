import { useState } from "react"
import ViewAppointmentHeader from "./ViewAppointmentHeader";
import "../styles/ViewAppointmentSection.css"
import UpcomingVisitButton from "./UpcomingVisitButton";
import AppointmentTable from "../components/AppointmentTable"

function ViewAppointmentSection() {
    const [appointments, setAppointments] = useState([]);
    const [activeFilter, setActiveFilter] = useState("upcoming");
    return(
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
            <AppointmentTable appointments={appointments}/>
        </section>
            
    );
}

export default ViewAppointmentSection;