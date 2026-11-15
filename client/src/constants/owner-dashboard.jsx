import { PawPrint, ClipboardList, CircleDollarSign } from "lucide-react";
import pillIcon from "../assets/owner-dashboard/alert-pill.svg";
import warningIcon from "../assets/owner-dashboard/alert-warning.svg";
import calendarIcon from "../assets/owner-dashboard/alert-calendar.svg";

export const OWNER_OVERVIEW_CARDS = [
    { key: "todayVisits", icon: PawPrint, title: "Today's visits" },
    { key: "pendingRequests", icon: ClipboardList, title: "Pending requests", subtitle: "waiting for your reply" },
    { key: "weeklyEarnings", icon: CircleDollarSign, title: "Earning this week" },
    { key: "unpaidBalance", icon: ClipboardList, title: "unpaid balance" },
];

export const OWNER_SECTION_TITLES = {
    dashboard: "Dashboard",
    calender: "Calender",
    appointments: "Appointments",
    customers_and_pets: "Customers And Pets",
    reviews: "Reviews",
    availability: "Availability",
    revenue: "Revenue",
    manage_admins: "Manage Admins",
    audit_log: "Audit Log",
    settings: "Settings",
};

export const OWNER_PET_CARE_ALERT_TYPES = {
    medication: { icon: pillIcon, iconClassName: "pet-care-alert-icon-pill", section: "customers_and_pets" },
    allergy: { icon: warningIcon, section: "customers_and_pets" },
    "reschedule-request": { icon: calendarIcon, section: "appointments" },
};

export const OWNER_VISIT_STATUS_LABELS = {
    completed: "Completed",
    "in-progress": "In progress",
    upcoming: "Upcoming",
};
