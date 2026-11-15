// Sample notifications used until the notifications API is connected (values match Figma).

/**
 * Sample notifications for the logged-in customer, newest first.
 * type: "appointment" | "cancelled" | "receipt" | "rescheduled"
 * action.section: the dashboard section the action link opens.
 */
export const mockNotifications = [
    { id: 1, type: "appointment", title: "Upcoming appointment", message: "Upcoming appointment for Mochi (10/3)", time: "2 min ago", read: false, action: { label: "View appointment", section: "appointments" } },
    { id: 2, type: "rescheduled", title: "Reschedule request", message: "Appointment rescheduled for Mochi (12/7)", time: "1 hr ago", read: false, action: { label: "View appointment", section: "appointments" } },
    { id: 3, type: "receipt", title: "Receipt received", message: "Receipt for Luna's appointment (9/12)", time: "3 hr ago", read: false, action: { label: "View Receipt", section: "payment" } },
    { id: 4, type: "cancelled", title: "Appointment cancelled", message: "Appointment canceled for Luna (11/28)", time: "Yesterday", read: true, action: { label: "Book appointment", section: "book" } },
    { id: 5, type: "appointment", title: "Appointment confirmed", message: "Appointment confirmed for Luna (11/23)", time: "2 days ago", read: false, action: { label: "View appointment", section: "appointments" } },
    { id: 6, type: "receipt", title: "Receipt received", message: "Receipt for Mochi's appointment (9/5)", time: "3 days ago", read: true, action: { label: "View Receipt", section: "payment" } },
    { id: 7, type: "appointment", title: "Upcoming appointment", message: "Upcoming appointment for Luna (9/30)", time: "4 days ago", read: true, action: { label: "View appointment", section: "appointments" } },
    { id: 8, type: "rescheduled", title: "Reschedule request", message: "Appointment rescheduled for Luna (10/14)", time: "5 days ago", read: true, action: { label: "View appointment", section: "appointments" } },
    { id: 9, type: "cancelled", title: "Appointment cancelled", message: "Appointment canceled for Mochi (9/18)", time: "1 week ago", read: true, action: { label: "Book appointment", section: "book" } },
    { id: 10, type: "appointment", title: "Appointment confirmed", message: "Appointment confirmed for Mochi (9/10)", time: "1 week ago", read: true, action: { label: "View appointment", section: "appointments" } },
    { id: 11, type: "receipt", title: "Receipt received", message: "Receipt for Luna's appointment (8/29)", time: "2 weeks ago", read: true, action: { label: "View Receipt", section: "payment" } },
    { id: 12, type: "appointment", title: "Upcoming appointment", message: "Upcoming appointment for Mochi (8/20)", time: "3 weeks ago", read: true, action: { label: "View appointment", section: "appointments" } },
];

/**
 * Fetches the temporary notification list for the signed-in customer.
 * @returns {Object[]} Notifications, newest first.
 */
export function getNotifications() {
    return mockNotifications.map((notification) => ({
        ...notification,
        action: { ...notification.action },
    }));
}

/**
 * Marks a temporary notification as read.
 * @param {number|string} id The notification ID.
 * @returns {{ok: boolean, id: number|string}} The result.
 */
export function markNotificationRead(id) {
    return { ok: id !== null && id !== undefined, id };
}

/**
 * Marks all temporary notifications as read.
 * @returns {{ok: boolean}} The result.
 */
export function markAllNotificationsRead() {
    return { ok: true };
}

/**
 * Dismisses a temporary notification.
 * @param {number|string} id The notification ID.
 * @returns {{ok: boolean, id: number|string}} The result.
 */
export function dismissNotification(id) {
    return { ok: id !== null && id !== undefined, id };
}