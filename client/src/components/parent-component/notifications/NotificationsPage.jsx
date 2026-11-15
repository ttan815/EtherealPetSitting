// Renders the full Notifications page with pagination.
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { getNotificationIcon, NOTIFICATION_PAGE_SIZE } from "../../../constants/notifications";
import { useNotifications } from "./NotificationsContext";
import "../../../styles/parent-component/Notifications.css"

/**
 * Shows every notification as a paginated list with actions, dismiss, and unread dots.
 * @param {Function} onBack Returns to the section the customer came from.
 * @returns {JSX.Element} The Notifications page.
 */
export default function NotificationsPage({ onBack }) {
    const { notifications, unreadCount, markRead, markAllRead, dismiss, openAction } = useNotifications();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(notifications.length / NOTIFICATION_PAGE_SIZE));

    // If dismissing empties the last page, step back a page.
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const visible = notifications.slice((page - 1) * NOTIFICATION_PAGE_SIZE, page * NOTIFICATION_PAGE_SIZE);

    return (
        <section className="nt-page">
            {/* Header (DT-276) */}
            <header className="nt-page-header">
                <div className="nt-page-heading">
                    <h1 className="nt-page-title">Notifications Page</h1>
                    {unreadCount > 0 && (
                        <span className="nt-count nt-count-large" aria-label={`${unreadCount} unread`}>
                            {unreadCount}
                        </span>
                    )}
                </div>
                <button
                    type="button"
                    className="nt-mark-all"
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                >
                    Mark all as read
                </button>
            </header>

            {/* List (DT-275) */}
            {notifications.length === 0 ? (
                <p className="nt-empty nt-empty-page">You have no notifications.</p>
            ) : (
                <ul className="nt-list">
                    {visible.map((n) => {
                        const Icon = getNotificationIcon(n.type);
                        return (
                            <li key={n.id} className={`nt-item${n.read ? "" : " unread"}`}>
                                <span className="nt-icon nt-icon-square" aria-hidden="true">
                                    <Icon size={20} strokeWidth={1.5} />
                                </span>

                                <div className="nt-item-text">
                                    <p className="nt-item-title">{n.message}</p>
                                    <p className="nt-item-time">{n.time}</p>
                                </div>

                                <button type="button" className="nt-action" onClick={() => openAction(n)}>
                                    {n.action.label}
                                    <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                                </button>

                                <span className="nt-dot-slot">
                                    {!n.read && (
                                        <button
                                            type="button"
                                            className="nt-unread-dot"
                                            onClick={() => markRead(n.id)}
                                            aria-label="Mark as read"
                                            title="Mark as read"
                                        />
                                    )}
                                </span>

                                <button
                                    type="button"
                                    className="nt-dismiss"
                                    onClick={() => dismiss(n.id)}
                                    aria-label={`Dismiss: ${n.message}`}
                                >
                                    <X size={26} strokeWidth={1.25} />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* Pagination (DT-275) */}
            <nav className="nt-pagination" aria-label="Notification pages">
                <button
                    type="button"
                    className="nt-outline-button"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                >
                    Previous page
                </button>
                <span className="nt-page-count">
                    Page {page} of {totalPages}
                </span>
                <button
                    type="button"
                    className="nt-outline-button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                >
                    Next page
                </button>
            </nav>

            <button type="button" className="nt-outline-button nt-back" onClick={onBack}>
                Back
            </button>
        </section>
    );
}