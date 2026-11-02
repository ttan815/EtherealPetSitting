// Renders the customer dashboard page.
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ViewAppointmentSection from "../components/customer-dashboard/view-appointment/ViewAppointmentSection";
import ManagePet from "../components/customer-dashboard/manage-pet/ManagePet";
import "../styles/customer-dashboard/CustomerDashboard.css";
import SidebarProfile from "../components/customer-dashboard/SidebarProfile";
import CustomerSidebarNav from "../components/customer-dashboard/CustomerSidebarNav";
import AdditionalTask from "../components/customer-dashboard/additional-task/AddtionalTask"
import Dashboard from "../components/customer-dashboard/main/Dashboard";
import ManagePersonalInfo from "../components/customer-dashboard/manage-personal-info/ManagePersonalInfo";

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
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(() =>
        location.state?.section === "appointments" ? "appointments" : "dashboard"
    );

    useEffect(() => {
        if (location.state?.section === "appointments") {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.pathname, location.state, navigate]);

    function renderSection() {
        switch (activeSection) {
            case "dashboard":
                return <Dashboard onNavigateSection={setActiveSection} />;
            case "appointments":
                return (
                    <ViewAppointmentSection
                        initialView={location.state?.view === "appointment-detail" ? "appointment-detail" : "main"}
                        initialAppointmentId={location.state?.appointmentId ?? ""}
                    />
                );
            case "pets":
                return <ManagePet />;
            case "profile":
                return <ManagePersonalInfo />;
            case "book":
                navigate("/book-appointment");
                break;
            case "tasks":
                return <AdditionalTask/>
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
