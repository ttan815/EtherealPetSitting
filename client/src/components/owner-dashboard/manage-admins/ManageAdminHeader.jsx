// header for the manage admins page, reuses the shared page header
import PageHeader from "../../parent-component/PageHeader";
import "../../../styles/owner-dashboard/manage-admins/ManageAdmins.css";

/**
 * Renders the manage admins title, owner badge, subtitle, bell, and invite button.
 * @param {Function} onInvite Called when the invite admin button is clicked.
 * @returns {JSX.Element} The manage admins header.
 */
export default function ManageAdminHeader({ onInvite }) {
    return (
        <PageHeader
            title={
                <>
                    Manage Admins <span className="ma-owner-badge">Owner</span>
                </>
            }
            subtitle="Add employees, control what they can see, and choose who covers for you."
            actionLabel="+ Invite admin"
            onAction={onInvite}
        />
    );
}
