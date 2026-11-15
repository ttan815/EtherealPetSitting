/**
 * Permissions available to an admin account.
 * @type {Array<Object>}
 */
export const ADMIN_PERMISSIONS = [
    "See the calendar and appointments",
    "See customer and pet info",
    "Accept or decline booking requests",
    "Mark visits as complete",
    "Approve or reject new reviews",
];

/**
 * Permissions available to the owner account.
 * @type {Array<Object>}
 */
export const OWNER_PERMISSIONS = [
    "Set available times",
    "See revenue and payments",
    "Remove approved reviews",
    "Add or remove admins",
    "See the audit log",
    "Change settings",
];

/**
 * Summary of actions admins can perform.
 * @type {string[]}
 */
export const ADMIN_CAN_DO = [
    "See the calendar, appointments, and customer & pet info",
    "Accept or decline booking requests",
    "Mark visits complete and approve reviews",
];
