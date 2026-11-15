const OWNER_OVERVIEW_METRICS = {
    completedVisits: 2,
    upcomingVisits: 4,
    pendingRequests: 3,
    weeklyEarnings: 1300.12,
    weeklyEarningsChange: 12.0,
    unpaidBalance: 200.21,
    unpaidVisits: 3,
};

const PET_CARE_ALERTS = [
    {
        id: "mochi-medication",
        type: "medication",
        headline: "Mochi — medication at 1:00 PM",
        detail: "1 pill with food · see pet profile",
        petId: "mochi",
    },
    {
        id: "oliver-allergy",
        type: "allergy",
        headline: "Oliver — allergic to chicken",
        detail: "Check treats before overnight stay",
        petId: "oliver",
    },
    {
        id: "pepper-reschedule",
        type: "reschedule-request",
        headline: "Pepper — reschedule requested",
        detail: "Customer asked to move Oct 4 → Oct 6",
        appointmentId: "pepper-oct-4",
    },
];

/**
 * Fetches temporary overview metrics for the owner dashboard.
 * @returns {Object} Visit, request and revenue metrics.
 */
export function getOwnerOverviewMetrics() {
    return { ...OWNER_OVERVIEW_METRICS };
}

/**
 * Fetches temporary pending request counts for the owner sidebar.
 * @returns {number[]} Counts for appointment and availability requests.
 */
export function getPendingOwnerRequestCounts() {
    return [1, 10];
}

/**
 * Fetches temporary pet-care alerts for the owner dashboard.
 * @returns {Object[]} Pet-care alerts.
 */
export function getPetCareAlerts() {
    return PET_CARE_ALERTS.map((alert) => ({ ...alert }));
}
