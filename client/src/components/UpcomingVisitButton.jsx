import { useState } from "react";
import "../styles/UpcomingVisitButton.css";

function UpcomingVisitButton({ onAppointmentsLoaded }) {
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

    function handleClick() {
        setLoading(true);

        // Later, replace this with an API request.
        onAppointmentsLoaded(tempAppointments);

        setLoaded(true);
        setLoading(false);
    }

    return (
        <button
            className="tab-pill-active"
            onClick={handleClick}
            disabled={loading}
        >
            <div className="upcoming-visits">
                Upcoming Visits
            </div>

            <div className="counter-badge">
                <div className="_3">
                    {loaded ? tempAppointments.length : 3}
                </div>
            </div>
        </button>
    );
}

export default UpcomingVisitButton;
