import { useState,useEffect } from "react";
import "../../../styles/customer-dashboard/view-appointment/UpcomingVisitButton.css";

function UpcomingVisitButton({ onAppointmentsLoaded, activeFilter, setActiveFilter }) {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Temporary data until the API is connected
    const tempAppointments = [
        {
            id: 1,
            petName: "Buddy",
            service: "Dog Walking",
            date: "Oct 26, 2026",
            time: "10:00 AM",
            status: "Confirmed",
            paymentStatus: "Paid",
            balance: "$0.00",
            petType: "dog"
        },
        {
            id: 2,
            petName: "Luna",
            service: "Pet Sitting",
            date: "Oct 28, 2026",
            time: "2:00 PM",
            status: "Pending",
            paymentStatus: "Unpaid",
            balance: "$45.00",
            petType: "cat"
        },
        {
            id: 3,
            petName: "Max",
            service: "Pet Grooming",
            date: "Oct 30, 2026",
            time: "11:00 AM",
            status: "Confirmed",
            paymentStatus: "Paid",
            balance: "$0.00",
            petType: "dog"
        },
    ];

    function loadAppointment() {
        // Later, replace this with an API request.
        onAppointmentsLoaded(tempAppointments);
        setLoaded(true);
        setLoading(false);
    }

    function handleClick() {
        setActiveFilter("upcoming")
        setLoading(true);
        loadAppointment();
    }

    // Upon Rendered, Automatically Loaded Table with Upcoming Appointment
    useEffect(() => {loadAppointment()}, [])

    return (
        <button className={activeFilter === "upcoming" ? "tab-pill-active": "tab-pill"}
            onClick={handleClick}
            disabled={loading}
        >
            <div className={activeFilter === "upcoming" ? "upcoming-visits": "upcoming-visits-inactive"}>
                Upcoming Visits
            </div>

            <div className={activeFilter === "upcoming" ? "counter-badge": "counter-badge-inactive"}>
                <div className={activeFilter === "upcoming" ? "number": "number-inactive"}>
                    {loaded ? tempAppointments.length : 3}
                </div>
            </div>

        </button>
    );
}

export default UpcomingVisitButton;
