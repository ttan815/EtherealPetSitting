// Renders the customer sidebar nav component.
import {
  LayoutGrid, CalendarDays, PawPrint, User,
  CalendarPlus, ClipboardList, Star, CircleDollarSign,
} from "lucide-react";
import SidebarNav from "../parent-component/SidebarNav";


const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "pets", label: "Manage Pet Information", icon: PawPrint },
  { id: "profile", label: "Manage Personal Information", icon: User },
  { id: "book", label: "Book an Appointment", icon: CalendarPlus },
  { id: "tasks", label: "Additional Task", icon: ClipboardList },
  { id: "review", label: "Write a Review", icon: Star },
  { id: "payment", label: "Make Online Payment", icon: CircleDollarSign },
];

/**
 * Renders the Customer dashboard section navigation.
 * @param {Object} props - Active section and navigation callback.
 * @param {string} props.activeSection - ID of the currently selected section.
 * @param {Function} props.onSelect - Called with a section ID when selected.
 * @returns {JSX.Element} The dashboard sidebar navigation.
 */
export default function CustomerSidebarNav({ activeSection, onSelect }) {
  return (
    <SidebarNav NAV_ITEMS={NAV_ITEMS} activeSection={activeSection} onSelect={onSelect} subtitle={"Customer Care"}/>
  );
}