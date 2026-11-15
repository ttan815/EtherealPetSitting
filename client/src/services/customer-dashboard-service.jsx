import { getCustomerProfile } from "./customer-service";
import { getUpcomingAppointments, getPastAppointments } from "./appointment-service";
import { getCustomerPets } from "./pet-service";

const CUSTOMER_DASHBOARD_REQUESTS = [
    { id: "porch-parcel", label: "Bring in the porch parcel", completed: false },
    { id: "fiddle-leaf-fig", label: "Water the fiddle-leaf fig", completed: false },
    { id: "patio-door", label: "Close the patio door", completed: true },
];

const CUSTOMER_CAREGIVER_NOTE = {
    caregiverName: "Adrian",
    caregiverInitials: "AP",
    timestamp: "Yesterday · 4:42 PM",
    message: "Mochi was in wonderful spirits. We had a sunny loop around the block, and he finished all his dinner.",
    photoCount: 3,
};

/**
 * Fetches temporary data used by the customer dashboard overview.
 * @returns {Object} Customer profile, appointments, pets, requests, and caregiver activity.
 */
export function getCustomerDashboardData() {
    const upcomingAppointment = getUpcomingAppointments()[0] ?? null;
    const completedAppointment = getPastAppointments()[0] ?? null;

    return {
        customer: getCustomerProfile(),
        pets: getCustomerPets(),
        upcomingAppointment,
        requests: CUSTOMER_DASHBOARD_REQUESTS.map((request) => ({ ...request })),
        caregiverNote: { ...CUSTOMER_CAREGIVER_NOTE },
        payment: upcomingAppointment
            ? {
                amount: upcomingAppointment.balance,
                service: upcomingAppointment.service,
                status: upcomingAppointment.paymentStatus,
                dueDate: "Oct 05",
            }
            : null,
        review: completedAppointment
            ? {
                service: completedAppointment.service,
                sitterName: completedAppointment.sitterName,
                date: completedAppointment.date,
                status: completedAppointment.status,
            }
            : null,
    };
}
