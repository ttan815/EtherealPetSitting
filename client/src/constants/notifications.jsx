import { ClipboardList, CircleX, ReceiptText, ArrowLeftRight } from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
const NOTIFICATION_ICONS = {
    appointment: ClipboardList,
    cancelled: CircleX,
    receipt: ReceiptText,
    rescheduled: ArrowLeftRight,
};

/**
 * Returns the icon component for a notification type.
 * @param {string} type Notification type.
 * @returns {import("react").ComponentType|undefined} The matching icon component.
 */
export function getNotificationIcon(type) {
    return NOTIFICATION_ICONS[type];
}

export const NOTIFICATION_OPTIONS = [
    { key: "newBookings", label: "New booking requests" },
    { key: "rescheduled", label: "Rescheduled appointments" },
    { key: "cancelled", label: "Cancelled appointments" },
    { key: "serviceUpdates", label: "Service updates" },
    { key: "newReviews", label: "New reviews" },
    { key: "weeklyEarnings", label: "Weekly earnings summary" },
];

export const NOTIFICATION_PAGE_SIZE = 5;
export const NOTIFICATION_POPUP_LIMIT = 4;
