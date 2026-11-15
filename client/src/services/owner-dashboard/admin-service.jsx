const SAMPLE_TEAM = [
    { id: "owner", name: "You", initials: "SA", email: "", role: "owner", status: "active", visitsThisWeek: 0 },
    { id: "a1", name: "Adrian P.", email: "adrian.p@email.com", phone: "", role: "admin", status: "active", visitsThisWeek: 7 },
    { id: "a2", name: "", email: "sitter.jamie@email.com", role: "admin", status: "pending", invitedOn: "Sep 26" },
];

let backupSettings = { enabled: true, backupId: "a1" };

/**
 * Fetches the temporary owner and admin team list.
 * @returns {Object[]} Team members.
 */
export function getAdmins() {
    return SAMPLE_TEAM.map((member) => ({ ...member }));
}

/**
 * Sends a temporary invite to a new admin.
 * @param {Object} details Admin name, email and phone.
 * @returns {Object} The pending invite.
 */
export function inviteAdmin(details) {
    return {
        id: `invite-${Date.now()}`,
        ...details,
        role: "admin",
        status: "pending",
        invitedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
}

/**
 * Saves temporary changes to an admin record.
 * @param {string} id Admin ID.
 * @param {Object} changes Updated admin fields.
 * @returns {boolean} Whether the update was accepted.
 */
export function updateAdmin(id, changes) {
    return Boolean(id && changes);
}

/**
 * Removes an admin's temporary access.
 * @param {string} id Admin ID.
 * @returns {boolean} Whether the removal was accepted.
 */
export function removeAdmin(id) {
    return Boolean(id);
}

/**
 * Resends a temporary admin invitation.
 * @param {string} id Invite ID.
 * @returns {boolean} Whether the resend was accepted.
 */
export function resendInvite(id) {
    return Boolean(id);
}

/**
 * Cancels a temporary admin invitation.
 * @param {string} id Invite ID.
 * @returns {boolean} Whether the cancellation was accepted.
 */
export function cancelInvite(id) {
    return Boolean(id);
}

/**
 * Fetches the temporary backup-admin settings.
 * @returns {{enabled: boolean, backupId: string}} Backup settings.
 */
export function getBackupSettings() {
    return { ...backupSettings };
}

/**
 * Saves temporary backup-admin settings.
 * @param {{enabled: boolean, backupId: string}} settings New settings.
 * @returns {boolean} Whether the settings were accepted.
 */
export function saveBackupSettings(settings) {
    if (!settings || typeof settings.enabled !== "boolean" || typeof settings.backupId !== "string") {
        return false;
    }
    backupSettings = { ...settings };
    return true;
}
