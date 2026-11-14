import PageHeader from "../../parent-component/PageHeader";
import OverviewHeader from "./OverviewHeader";
import { useState } from "react";
import TodaysVisitsCard from "./TodaysVisitsCard";
import TodaysSchedule from "./TodaysSchedule";
import PetCareAlerts from "./PetCareAlerts";
import "../../../styles/owner-dashboard/Dashboard.css";

// Temporary placeholder visits (Figma "Admin — Dashboard").
// BACKEND: replace with today's appointments from the API, in the same shape.
// status: "completed" | "in-progress" | "upcoming"
function getTodaySchedule() {
    return [
        { id: "visit-biscuit", time: "8:00 AM", duration: "30 min", petName: "Biscuit", breed: "Golden Retriever", service: "Dog Walking", customerName: "Sarah M.", sitterName: "You", status: "completed" },
        { id: "visit-luna", time: "10:30 AM", duration: "45 min", petName: "Luna", breed: "Tabby Cat", service: "Drop-in Care", customerName: "James T.", sitterName: "Adrian", status: "completed" },
        { id: "visit-mochi", time: "1:00 PM", duration: "30 min", petName: "Mochi", breed: "Shiba Inu", service: "Medication", customerName: "Priya K.", sitterName: "You", status: "in-progress" },
        { id: "visit-pepper", time: "3:30 PM", duration: "1 hr", petName: "Pepper", breed: "Beagle", service: "Whole Day Care", customerName: "Daniel R.", sitterName: "Adrian", status: "upcoming" },
        { id: "visit-oliver", time: "6:00 PM", duration: "Overnight", petName: "Oliver", breed: "Maine Coon", service: "Overnight Stay", customerName: "Emma L.", sitterName: "You", status: "upcoming" },
    ];
}

export default function Dashboard( {onNavigate} ) {
    // Shared by Today's Schedule and the Today's visits card, so both update together
    const [visits, setVisits] = useState(getTodaySchedule);

    // Temporary: only updates the page.
    // BACKEND: also tell the API this appointment is complete.
    function markAppointmentComplete(id) {
        setVisits((current) => current.map((visit) => (visit.id === id ? { ...visit, status: "completed" } : visit)));
    }

    const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

    return (
        <section>
            {/* Add New Appointment */}
            <PageHeader title={"Welcome, Owner"} subtitle={`${formattedDate} —  here's today at a glance`}/>
            <OverviewHeader/>

            <br/>

            <div className="owner-dashboard-home">
                <PetCareAlerts onNavigate={onNavigate} />
                <TodaysSchedule
                    visits={visits}
                    onMarkComplete={markAppointmentComplete}
                    onViewCalendar={() => onNavigate("calender")}
                />
                
            </div>
        </section>
    );
}
