// Renders the customer sidebar nav component.
import {
  LayoutGrid, CalendarDays, PawPrint, User,
  CalendarPlus, ClipboardList, Star, CircleDollarSign,
} from "lucide-react";
import "../../styles/customer-dashboard/CustomerSidebarNav.css";

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
 * Renders the customer dashboard section navigation.
 * @param {Object} props - Active section and navigation callback.
 * @param {string} props.activeSection - ID of the currently selected section.
 * @param {Function} props.onSelect - Called with a section ID when selected.
 * @returns {JSX.Element} The dashboard sidebar navigation.
 */
export default function CustomerSidebarNav({ activeSection, onSelect }) {
  return (
    <nav aria-label="Customer navigation">
      <a className="sidebar-brand" href="/">
        <img src="/sidebar-logo.svg" alt="" className="sidebar-logo" />
        <div className="brand-text">
          <p className="brand-title">Ethereal</p>
          <p className="brand-subtitle">Customer Care</p>
        </div>
      </a>

      <p className="sidebar-section-label">Your Care Space</p>

      <ul className="nav-list">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              type="button"
              aria-current={activeSection === id ? "page" : undefined}
              className={`nav-item${activeSection === id ? " active" : ""}`}
              onClick={() => onSelect(id)}
            >
              <Icon className="nav-icon" strokeWidth={1.75} aria-hidden="true" />
              <span className="nav-label">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}