// header for the settings page, reuses the shared page header with a save changes button
import PageHeader from "../../parent-component/PageHeader";
import "../../../styles/owner-dashboard/settings/Settings.css";

/**
 * Renders the settings title, owner badge, subtitle, bell, and save changes button.
 * @param {Function} onSave Called when save changes is clicked.
 * @param {boolean} canSave True when there are unsaved changes and nothing is invalid.
 * @returns {JSX.Element} The settings header.
 */
export default function SettingsHeader({ onSave, canSave }) {
    return (
        <PageHeader
            title={
                <>
                    Settings <span className="st-owner-badge">Owner</span>
                </>
            }
            subtitle="Business details, prices, deposits, and notifications."
            actionLabel="Save changes"
            onAction={onSave}
            actionDisabled={!canSave}
        />
    );
}
