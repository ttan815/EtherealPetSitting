// what each role can do card, shows admin abilities next to owner only abilities
import { Check, Lock } from "lucide-react";
import "../../../styles/owner-dashboard/manage-admins/ManageAdmins.css";

export const ADMIN_PERMISSIONS = [
    "See the calendar and appointments",
    "See customer and pet info",
    "Accept or decline booking requests",
    "Mark visits as complete",
    "Approve or reject new reviews",
];

export const OWNER_PERMISSIONS = [
    "Set available times",
    "See revenue and payments",
    "Remove approved reviews",
    "Add or remove admins",
    "See the audit log",
    "Change settings",
];

/**
 * Renders the roles and permissions info card.
 * @returns {JSX.Element} The what each role can do card.
 */
export default function RolesPermissionInfo() {
    return (
        <section className="ma-card" aria-labelledby="ma-roles-title">
            <h2 id="ma-roles-title" className="ma-card-title">What each role can do</h2>

            <div className="ma-roles-grid">
                <div className="ma-role-box">
                    <h3 className="ma-role-title">Admins (employees) can</h3>
                    <ul className="ma-role-list">
                        {ADMIN_PERMISSIONS.map((item) => (
                            <li key={item}>
                                <Check size={16} strokeWidth={2} aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ma-role-box">
                    <h3 className="ma-role-title">Only you (owner) can</h3>
                    <ul className="ma-role-list">
                        {OWNER_PERMISSIONS.map((item) => (
                            <li key={item}>
                                <Lock size={16} strokeWidth={1.75} aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
