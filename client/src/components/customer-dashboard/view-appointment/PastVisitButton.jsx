import { useState, useEffect } from "react";

function PastVisitButton({ onAppointmentsLoaded, activeFilter, setActiveFilter }) {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Temporary data until the API is connected
    const tempAppointments = [
        {
            id: 1,
            petName: "Samson",
            service: "Dog Walking",
            date: "Oct 26, 2026",
            time: "10:00 AM",
            status: "Completed",
            paymentStatus: "Paid",
            balance: "$0.00",
            petType: "dog"
        },
        {
            id: 2,
            petName: "Pops",
            service: "Pet Sitting",
            date: "Oct 28, 2026",
            time: "2:00 PM",
            status: "Completed",
            paymentStatus: "Paid",
            balance: "$0.00",
            petType: "cat"
        },
        {
            id: 3,
            petName: "Carl",
            service: "Pet Grooming",
            date: "Oct 30, 2026",
            time: "11:00 AM",
            status: "Completed",
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
        setActiveFilter("past")
        setLoading(true);
        loadAppointment();
    }

    // Upon Rendered, Automatically Loaded Table with Upcoming Appointment
    useEffect(() => { loadAppointment() }, [])

    return (
        <button className={activeFilter === "past" ? "tab-pill-active" : "tab-pill"}
            onClick={handleClick}
            disabled={loading}
        >
            <div className={activeFilter === "past" ? "upcoming-visits" : "upcoming-visits-inactive"}>
                Past History
            </div>

            <div className={activeFilter === "upcoming" ? "counter-badge-inactive" : "counter-badge"}>
                <div className={activeFilter === "upcoming" ? "number-inactive" : "number"}>
                    {loaded ? tempAppointments.length : 3}
                </div>
            </div>

        </button>
    );
}

export default PastVisitButton