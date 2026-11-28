import {
  LayoutGrid, Calendar, PawPrint,
  Clock , ClipboardList, Star
} from "lucide-react";

/**
 * Builds the sidebar navigation items for the owner dashboard.
 * @returns {Array<{id: string, label: string, icon: object}>} The list of owner dashboard navigation items.
 */
/**
 * Navigation sections shown in the owner dashboard sidebar.
 * @type {Array<Object>}
 */
export const EMPLOYEE_NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "calender", label: "Calender", icon: Calendar },
    { id: "appointments", label: "Appointments", icon: ClipboardList },
    { id: "customers_and_pets", label: "Customers And Pets", icon: PawPrint },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "availability", label: "Availability", icon: Clock }
];
