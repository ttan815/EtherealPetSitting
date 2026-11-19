import "../styles/customer-dashboard/CustomerDashboard.css";
import { useLocation } from "react-router";
import { useCallback, useState } from "react";
import NotificationsPage from "../components/parent-component/notifications/NotificationsPage";
import { NotificationsProvider } from "../components/parent-component/notifications/NotificationsContext";
import EmployeeSidebarNav from "../components/employee-dashboard/EmployeeSidebarNav";
import Dashboard from "../components/employee-dashboard/main/Dashboard";
import Calender  from "../components/employee-dashboard/calender/Calender";
import Appointments from "../components/employee-dashboard/appointments/Appointment"
import CustomersAndPets from "../components/employee-dashboard/customers-and-pets/CustomersAndPets"
import Reviews from "../components/employee-dashboard/reviews/Review"
import Availability from "../components/employee-dashboard/availability/Availability"
import SidebarProfile from "../components/parent-component/SidebarProfile";
import { NewAppointmentProvider } from "../context/NewAppointmentProvider";
import { getPendingOwnerRequestCounts } from "../services/owner-dashboard/dashboard-service";

// Temporary placeholder for Logging out
function logout() {
    console.log("Logged out")
}


/**
 * Renders the owner dashboard and its selected section.
 * @returns {JSX.Element} The owner dashboard page.
 */
function EmployeeDashboard() {
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
            case "availability":
                return <Availability/>;
            case "notifications":
                return <NotificationsPage onBack={() => setActiveSection(previousSection)} />;
        }
    }

    return (
        <NotificationsProvider onViewAll={openNotifications} onNavigate={setActiveSection}>
            <NewAppointmentProvider>
                <main className="customer-dashboard">
                    <div className="customer-dashboard-layout">
                        <aside className="customer-sidebar">
                            {/*Side Bar*/}
                            <EmployeeSidebarNav 
                                activeSection={activeSection}
                                onSelect={handleSelectSection}
                                pendingRequestCount={pendingRequestCount}
                            />
                            <SidebarProfile name="Angelena Chantengco" role="Admin" onLogout={logout}/>
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

export default EmployeeDashboard;