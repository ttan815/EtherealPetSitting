import "../styles/customer-dashboard/CustomerDashboard.css";
import { useLocation } from "react-router";
import { useCallback, useState } from "react";
import NotificationsPage from "../components/parent-component/notifications/NotificationsPage";
import { NotificationsProvider } from "../components/parent-component/notifications/NotificationsContext";
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
import SidebarProfile from "../components/parent-component/SidebarProfile";
import { NewAppointmentProvider } from "../context/NewAppointmentProvider";
import { OWNER_SECTION_TITLES } from "../constants/owner-dashboard";
import { getPendingOwnerRequestCounts } from "../services/dashboard-service";

// Temporary placeholder for Logging out
function logout() {
    console.log("Logged out")
}


/**
 * Renders the owner dashboard and its selected section.
 * @returns {JSX.Element} The owner dashboard page.
 */
function OwnerDashboard() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(() =>
        location.state?.section === "appointments" ? "appointments" : "dashboard"
    );  
    const [previousSection, setPreviousSection] = useState("dashboard");
    const [pendingRequestCount, setPendingRequestCount] = useState(getPendingOwnerRequestCounts);
    const openNotifications = () => {
        setPreviousSection(activeSection);
        setActiveSection("notifications");
    };

        // Appointments calls this when its request count changes so the sidebar badge updates live
    const handleAppointmentRequestCount = useCallback((count) => {
        setPendingRequestCount((prev) => (prev[0] === count ? prev : [count, prev[1]]));
    }, []);

    function handleSelectSection(section) {
        setActiveSection(section);
    }

    function renderSection() {
        switch (activeSection) {
            case "dashboard":
                return <Dashboard onNavigate={handleSelectSection}/>;
            case "calender":
                return <Calender/>;
            case "appointments":
                return <Appointments onRequestCountChange={handleAppointmentRequestCount}/>;
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
                        <h1>{OWNER_SECTION_TITLES[activeSection]}</h1>
                        <p>This section is not available yet.</p>
                    </section>
                );
        }
    }

    return (
        <NotificationsProvider onViewAll={openNotifications} onNavigate={setActiveSection}>
            <NewAppointmentProvider>
                <main className="customer-dashboard">
                    <div className="customer-dashboard-layout">
                        <aside className="customer-sidebar">
                            <OwnerSidebarNav
                                activeSection={activeSection}
                                onSelect={handleSelectSection}
                                pendingRequestCount={pendingRequestCount}
                            />
                            <SidebarProfile name="Angelena Chantengco" role="Owner" onLogout={logout}/>
                        </aside>
                        <div className="customer-dashboard-content">
                            {renderSection()}
                        </div>
                    </div>
                </main>
            </NewAppointmentProvider>
        </NotificationsProvider>
    );
}

export default OwnerDashboard;