import {
  LayoutGrid, Calendar, PawPrint, Users,
  Clock , ClipboardList, Star, ChartColumnBig, ShieldCheck, Settings
} from "lucide-react";
import SidebarNav from "../parent-component/SidebarNav";


const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "calender", label: "Calender", icon: Calendar },
    { id: "appointments", label: "Appointments", icon: ClipboardList },
    { id: "customers_and_pets", label: "Customers And Pets", icon: PawPrint },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "availability", label: "Availability", icon: Clock },
    { id: "revenue", label: "Revenue", icon: ChartColumnBig },
    { id: "manage_admins", label: "Manage Admins", icon: Users },
    { id: "audit_log", label: "Audit Log", icon: ShieldCheck },
    { id: "settings", label: "Settings", icon: Settings },
];


function OwnerSidebarNav({ activeSection, onSelect, pendingRequestCount }) {
    return (
        <SidebarNav
            NAV_ITEMS={NAV_ITEMS}
            subtitle={"Owner"}
            activeSection={activeSection}
            onSelect={onSelect}
            notificationCounts={{
                appointments: pendingRequestCount[0],
                availability: pendingRequestCount[1],
            }}
        />
    );
}

export default OwnerSidebarNav;