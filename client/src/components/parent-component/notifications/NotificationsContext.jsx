// Shares the customer's notifications between the bell popup and the Notifications page.
import { createContext, useContext, useMemo, useState } from "react";
import {
    dismissNotification,
    getNotifications,
    markAllNotificationsRead,
    markNotificationRead,
} from "../../../services/notification-service";

const NotificationsContext = createContext(null);

/**
 * Holds the notification list and the actions that change it.
 * @param {JSX.Element} children The dashboard content that uses notifications.
 * @param {Function} onViewAll Opens the full Notifications page.
 * @param {Function} onNavigate Opens a dashboard section by name, e.g. "appointments".
 * @returns {JSX.Element} The provider.
 */
export function NotificationsProvider({ children, onViewAll, onNavigate }) {
    const [notifications, setNotifications] = useState(getNotifications);

    const value = useMemo(() => {
        const unreadCount = notifications.filter((n) => !n.read).length;

        return {
            notifications,
            unreadCount,
            markRead: (id) => {
                if (markNotificationRead(id).ok) {
                    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
                }
            },
            markAllRead: () => {
                if (markAllNotificationsRead().ok) {
                    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
                }
            },
            dismiss: (id) => {
                if (dismissNotification(id).ok) {
                    setNotifications((list) => list.filter((n) => n.id !== id));
                }
            },
            openAction: (notification) => {
                if (markNotificationRead(notification.id).ok) {
                    setNotifications((list) =>
                        list.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
                    );
                    onNavigate?.(notification.action.section);
                }
            },
            viewAll: () => onViewAll?.(),
        };
    }, [notifications, onViewAll, onNavigate]);

    return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

/**
 * Reads the shared notifications; returns null when used outside a NotificationsProvider.
 * @returns {object|null} The notifications and their actions.
 */
export function useNotifications() {
    return useContext(NotificationsContext);
}