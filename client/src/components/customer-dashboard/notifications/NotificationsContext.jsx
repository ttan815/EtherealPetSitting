// Shares the customer's notifications between the bell popup and the Notifications page.
import { createContext, useContext, useMemo, useState } from "react";
import { ClipboardList, CircleX, ReceiptText, ArrowLeftRight } from "lucide-react";
import { mockNotifications } from "../../../constants/mock-notifications";

const NotificationsContext = createContext(null);

/**
 * Icon shown for each notification type.
 */
export const NOTIFICATION_ICONS = {
    appointment: ClipboardList,
    cancelled: CircleX,
    receipt: ReceiptText,
    rescheduled: ArrowLeftRight,
};

/**
 * Holds the notification list and the actions that change it.
 * @param {JSX.Element} children The dashboard content that uses notifications.
 * @param {Function} onViewAll Opens the full Notifications page.
 * @param {Function} onNavigate Opens a dashboard section by name, e.g. "appointments".
 * @returns {JSX.Element} The provider.
 */
export function NotificationsProvider({ children, onViewAll, onNavigate }) {
    // TODO: load from the notifications API.
    const [notifications, setNotifications] = useState(mockNotifications);

    const value = useMemo(() => {
        const unreadCount = notifications.filter((n) => !n.read).length;

        return {
            notifications,
            unreadCount,
            markRead: (id) =>
                setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n))),
            markAllRead: () => setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
            dismiss: (id) => setNotifications((list) => list.filter((n) => n.id !== id)),
            openAction: (notification) => {
                setNotifications((list) =>
                    list.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
                );
                onNavigate?.(notification.action.section);
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