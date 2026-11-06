import "../styles/customer-dashboard/CustomerDashboard.css";
import { useLocation } from "react-router";
import { useState } from "react";
import NotificationsPage from "../components/customer-dashboard/notifications/NotificationsPage";
import { NotificationsProvider } from "../components/customer-dashboard/notifications/NotificationsContext";
import OwnerSidebarNav from "../components/owner-dashboard/OwnerSidebarNav";
import Dashboard from "../components/owner-dashboard/main/Dashboard";
import Calender  from "../components/owner-dashboard/calender/Calender";
import Appointments from "../components/owner-dashboard/appointments/Appointments"
import CustomersAndPets from "../components/owner-dashboard/customers-and-pets/CustomersAndPets"
import Reviews from "../components/owner-dashboard/reviews/Reviews"
import Availability from "../components/owner-dashboard/availability/Availability"
import Revenue from "../components/owner-dashboard/revenue/Revenue"
import ManageAdmins from "../components/owner-dashboard/manage-admins/ManageAdmins"
import AuditLog from "../components/owner-dashboard/audit-log/AuditLog"
import Settings from "../components/owner-dashboard/settings/Settings"

const SECTION_TITLES = {
    dashboard: "Dashboard",
    calender: "Calender",
    appointments: "Appointments",
    customers_and_pets: "Customers And Pets",
    reviews: "Reviews",
    availability: "Availability",
    revenue: "Revenue",
    manage_admins: "Manage Admins",
    audit_log: "Audit Log",
    settings: "Settings"
};

// Temporary placeholder until pending appointment and availability requests come from the API.
function getPendingRequestCount() {
    const pendingCount = [1,10]; // [Appointment, Availability]
    return pendingCount;
}



function OwnerDashboard() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(() =>
        location.state?.section === "appointments" ? "appointments" : "dashboard"
    );  
    const [previousSection, setPreviousSection] = useState("dashboard");
    const pendingRequestCount = getPendingRequestCount();
    const openNotifications = () => {
        setPreviousSection(activeSection);
        setActiveSection("notifications");
    };

    function handleSelectSection(section) {
        setActiveSection(section);
    }

    function renderSection() {
        switch (activeSection) {
            case "dashboard":
                return <Dashboard/>;
            case "calender":
                return <Calender/>;
            case "appointments":
                return <Appointments/>;
            case "customers_and_pets":
                return <CustomersAndPets/>
            case "reviews":
                return <Reviews/>
            case "manage_admins":
                return <ManageAdmins/>;
            case "audit_log":
                return <AuditLog/>;
            case "Settings":
                return <Settings/>;
            case "availability":
                return <Availability/>;
            case "revenue":
                return <Revenue/>
            case "settings":
                return <Settings/>
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
                    <OwnerSidebarNav
                        activeSection={activeSection}
                        onSelect={handleSelectSection}
                        pendingRequestCount={pendingRequestCount}
                    />
                </aside>
                <div className="customer-dashboard-content">
                    {renderSection()}
                </div>
            </div>
        </main>
        </NotificationsProvider>
    );
}

export default OwnerDashboard;