import ViewAppointmentHeader from "./ViewAppointmentHeader";
import "../styles/ViewAppointmentSection.css"
import UpcomingVisitButton from "./UpcomingVisitButton";

function ViewAppointmentSection() {
    return(
         <section className="view-appointment-section">
            <ViewAppointmentHeader />
            
            <div className="tab-filter-navigation">
                <UpcomingVisitButton/>
            </div>
            {/* Appointments table*/}
        </section>
            
    );
}

export default ViewAppointmentSection;