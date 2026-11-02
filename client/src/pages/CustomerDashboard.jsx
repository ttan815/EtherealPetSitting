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
import NotificationsPage from "../components/customer-dashboard/notifications/NotificationsPage";
import { NotificationsProvider } from "../components/customer-dashboard/notifications/NotificationsContext";

const SECTION_TITLES = {
    profile: "Manage Personal Information",
    book: "Book an Appointment",
    tasks: "Additional Task",
    review: "Write a Review",
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
    const [previousSection, setPreviousSection] = useState("dashboard");
    const openNotifications = () => {
        setPreviousSection(activeSection);
        setActiveSection("notifications");
    };

    useEffect(() => {
        if (location.state?.section === "appointments") {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.pathname, location.state, navigate]);

    function handleSelectSection(section) {
        if (section === "payment") {
            navigate("/payment/EBP-2026-0847");
            return;
        }
        setActiveSection(section);
    }

    function renderSection() {
        switch (activeSection) {
            case "dashboard":
                return <Dashboard onNavigateSection={handleSelectSection} />;
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
            case "notifications":
                return <NotificationsPage onBack={() => setActiveSection(previousSection)} />;
            
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
        <NotificationsProvider onViewAll={openNotifications} onNavigate={setActiveSection}>
        <main className="customer-dashboard">
            <div className="customer-dashboard-layout">
                <aside className="customer-sidebar">
                    <CustomerSidebarNav
                        activeSection={activeSection}
                        onSelect={handleSelectSection}
                    />
                    <SidebarProfile name="Maya Rivera" role="Customer account" />
                </aside>
                <div className="customer-dashboard-content">
                    {renderSection()}
                </div>
            </div>
        </main>
        </NotificationsProvider>
    );
}

export default CustomerDashboard;
