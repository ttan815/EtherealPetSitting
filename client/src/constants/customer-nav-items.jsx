import {
  LayoutGrid, CalendarDays, PawPrint, User,
  CalendarPlus, ClipboardList, Star, CircleDollarSign,
} from "lucide-react";

/**
 * Builds the sidebar navigation items for the customer dashboard.
 * @returns {Array<{id: string, label: string, icon: object}>} The list of customer dashboard navigation items.
 */
export const CUSTOMER_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "pets", label: "Manage Pet Information", icon: PawPrint },
  { id: "profile", label: "Manage Personal Information", icon: User },
  { id: "book", label: "Book an Appointment", icon: CalendarPlus },
  { id: "tasks", label: "Additional Task", icon: ClipboardList },
  { id: "review", label: "Write a Review", icon: Star },
  { id: "payment", label: "Make Online Payment", icon: CircleDollarSign },
];
