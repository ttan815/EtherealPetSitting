// Renders the customer dashboard page.
import { useState } from "react";
import { useNavigate } from "react-router"
import ViewAppointmentSection from "../components/customer-dashboard/view-appointment/ViewAppointmentSection";
import ManagePet from "../components/customer-dashboard/manage-pet/ManagePet";
import "../styles/customer-dashboard/CustomerDashboard.css";
import SidebarProfile from "../components/customer-dashboard/SidebarProfile";
import CustomerSidebarNav from "../components/customer-dashboard/CustomerSidebarNav";

const SECTION_TITLES = {
    profile: "Manage Personal Information",
    book: "Book an Appointment",
    tasks: "Additional Task",
    review: "Write a Review",
    payment: "Make Online Payment",
};

/**
 * Renders the customer dashboard and its selected account section.
 * @returns {JSX.Element} The customer dashboard page.
 */
function CustomerDashboard() {
    const [activeSection, setActiveSection] = useState("dashboard");
    const navigate = useNavigate();

    function renderSection() {
        switch (activeSection) {
            case "dashboard":
                return <h1>Dashboard</h1>;
            case "appointments":
                return <ViewAppointmentSection />;
            case "pets":
                return <ManagePet />;
            case "profile":
                return <h1>Personal Information</h1>
            case "book":
                navigate("/book-appointment");
                break;
            case "tasks":
                return <h1>Additional Task</h1>
            case "review":
                navigate("/reviews");
                break;
            case "payment":
                navigate("/payments");
            
            default:
                return (
                    <section>
                        <h1>{SECTION_TITLES[activeSection]}</h1>
                        <p>This section is not available yet.</p>
                    </section>
                );
        }
    }

    return (
        <main className="customer-dashboard">
            <div className="customer-dashboard-layout">
                <aside className="customer-sidebar">
                    <CustomerSidebarNav
                        activeSection={activeSection}
                        onSelect={setActiveSection}
                    />
                    <SidebarProfile name="Maya Rivera" role="Customer account" />
                </aside>
                <div className="customer-dashboard-content">
                    {renderSection()}
                </div>
            </div>
        </main>
    );
}

export default CustomerDashboard;
