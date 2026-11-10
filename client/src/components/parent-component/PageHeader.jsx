// Renders the shared header used at the top of customer dashboard sections.
import NotificationBell from "./notifications/NotificationBell";
import "../../styles/parent-component/PageHeader.css"

/**
 * Renders a section header with a title, subtitle, bell button, and optional action button.
 * @param {string} title The main heading text.
 * @param {string} subtitle The supporting text under the heading.
 * @param {string} actionLabel The label for the action button; the button is hidden when empty.
 * @param {Function} onAction Called when the action button is clicked.
 * @param {boolean} actionDisabled Disables the action button when true.
 * @returns {JSX.Element} The page header.
 */
export default function PageHeader({ title, subtitle, actionLabel, onAction, actionDisabled }) {
    return (
        <header className="ph-page-header">
            <div>
                <h1 className="ph-page-title">{title}</h1>
                {subtitle && <p className="ph-page-subtitle">{subtitle}</p>}
            </div>

            <div className="ph-page-header-actions">
                <NotificationBell className="ph-bell-button" />
                {actionLabel && (
                    <button
                        type="button"
                        className="ph-primary-button"
                        onClick={onAction}
                        disabled={actionDisabled}
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
        </header>
    );
}