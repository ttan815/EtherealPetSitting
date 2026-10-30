import { NavLink } from "react-router";
import {
  LayoutGrid, CalendarDays, PawPrint, User,
  CalendarPlus, ClipboardList, Star, CircleDollarSign,
} from "lucide-react";
import "../styles/CustomerSidebarNav.css";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/customer/dashboard", icon: LayoutGrid },
  { label: "Appointments", to: "/customer/appointments", icon: CalendarDays },
  { label: "Manage Pet Information", to: "/customer/pets", icon: PawPrint },
  { label: "Manage Personal Information", to: "/customer/profile", icon: User },
  { label: "Book an Appointment", to: "/customer/book", icon: CalendarPlus },
  { label: "Additional Task", to: "/customer/tasks", icon: ClipboardList },
  { label: "Write a Review", to: "/customer/review", icon: Star },
  { label: "Make Online Payment", to: "/customer/payment", icon: CircleDollarSign },
];

export default function CustomerSidebarNav() {
  return (
    <nav aria-label="Customer navigation">
      <div className="sidebar-brand">
        <img src="/sidebar-logo.svg" alt="" className="sidebar-logo" />
        <div className="brand-text">
          <p className="brand-title">Ethereal</p>
          <p className="brand-subtitle">Customer Care</p>
        </div>
      </div>

      <p className="sidebar-section-label">Your Care Space</p>

      <ul className="nav-list">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              <Icon className="nav-icon" strokeWidth={1.75} aria-hidden="true" />
              <span className="nav-label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}