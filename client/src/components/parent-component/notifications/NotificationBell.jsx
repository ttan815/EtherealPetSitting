// Renders the bell button and its notifications popup.
import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { getNotificationIcon, NOTIFICATION_POPUP_LIMIT } from "../../../constants/notifications/notifications";
import { useNotifications } from "./NotificationsContext";
import "../../../styles/parent-component/Notifications.css";

/**
 * Bell button that opens a popup with the latest notifications, "Mark all as read", and "View all activity".
 * @param {string} className Class for the bell button so it matches the page header.
 * @returns {JSX.Element} The bell and popup.
 */
export default function NotificationBell({ className = "" }) {
    const ctx = useNotifications();
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    // Close the popup on outside click or Esc.
    useEffect(() => {
        if (!open) return undefined;
        function handleClick(e) {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        }
        function handleKey(e) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    // Outside the notifications provider, show a plain bell.
    if (!ctx) {
        return (
            <button type="button" className={className} aria-label="Notifications">
                <Bell size={16} strokeWidth={1.75} />
            </button>
        );
    }

    const { notifications, unreadCount, markAllRead, openAction, viewAll } = ctx;
    const latest = notifications.slice(0, NOTIFICATION_POPUP_LIMIT);

    function handleViewAll() {
        setOpen(false);
        viewAll();
    }

    function handleItem(notification) {
        setOpen(false);
        openAction(notification);
    }

    return (
        <div className="nt-bell-wrap" ref={wrapRef}>
            <button
                type="button"
                className={className}
                aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                <Bell size={16} strokeWidth={1.75} />
                {unreadCount > 0 && <span className="nt-bell-dot" aria-hidden="true" />}
            </button>

            {open && (
                <div className="nt-popup" role="dialog" aria-label="Notifications">
                    <div className="nt-popup-header">
                        <h2 className="nt-popup-title">Notifications</h2>
                        {unreadCount > 0 && <span className="nt-count">{unreadCount}</span>}
                        <button
                            type="button"
                            className="nt-popup-mark"
                            onClick={markAllRead}
                            disabled={unreadCount === 0}
                        >
                            Mark all as read
                        </button>
                    </div>

                    {latest.length === 0 ? (
                        <p className="nt-empty">You're all caught up.</p>
                    ) : (
                        <ul className="nt-popup-list">
                            {latest.map((n) => {
                                const Icon = getNotificationIcon(n.type);
                                return (
                                    <li key={n.id}>
                                        <button
                                            type="button"
                                            className={`nt-popup-item${n.read ? "" : " unread"}`}
                                            onClick={() => handleItem(n)}
                                        >
                                            <span className="nt-icon nt-icon-round" aria-hidden="true">
                                                <Icon size={16} strokeWidth={1.75} />
                                            </span>
                                            <span className="nt-popup-text">
                                                <span className="nt-popup-item-title">{n.title}</span>
                                                <span className="nt-popup-message">{n.message}</span>
                                                <span className="nt-popup-time">{n.time}</span>
                                            </span>
                                            {!n.read && <span className="nt-popup-dot" aria-label="Unread" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <button type="button" className="nt-popup-footer" onClick={handleViewAll}>
                        View all activity
                    </button>
                </div>
            )}
        </div>
    );
}