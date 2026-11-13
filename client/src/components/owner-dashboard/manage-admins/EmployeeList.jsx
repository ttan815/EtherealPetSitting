// your team card that lists the owner, admins, and pending invites
import { Mail } from "lucide-react";
import "../../../styles/owner-dashboard/manage-admins/ManageAdmins.css";

/**
 * Turns a name into initials for the avatar circle.
 * @param {string} name The person's full name.
 * @returns {string} Up to two capital letters.
 */
export function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
}

/**
 * Builds the small summary line under the card title.
 * @param {Array} members Everyone on the team, including pending invites.
 * @returns {string} Text like "2 people plus 1 pending invite".
 */
function getTeamSummary(members) {
    const people = members.filter((m) => m.status === "active").length;
    const pending = members.filter((m) => m.status === "pending").length;
    const peopleText = `${people} ${people === 1 ? "person" : "people"}`;
    if (pending === 0) return peopleText;
    return `${peopleText} plus ${pending} pending ${pending === 1 ? "invite" : "invites"}`;
}

/**
 * Renders the your team card with one row per owner, admin, or pending invite.
 * @param {Array} members List of team members ({ id, name, initials, email, role, status, visitsThisWeek, invitedOn }).
 * @param {Function} onEdit Called with the member when edit is clicked.
 * @param {Function} onRemove Called with the member when remove is clicked.
 * @param {Function} onResend Called with the member when resend is clicked.
 * @param {Function} onCancelInvite Called with the member when cancel invite is clicked.
 * @returns {JSX.Element} The employee list card.
 */
export default function EmployeeList({ members, onEdit, onRemove, onResend, onCancelInvite }) {
    return (
        <section className="ma-card ma-team-card" aria-labelledby="ma-team-title">
            <h2 id="ma-team-title" className="ma-card-title">Your team</h2>
            <p className="ma-card-subtitle">{getTeamSummary(members)}</p>

            <ul className="ma-team-list">
                {members.map((member) => {
                    const isOwner = member.role === "owner";
                    const isPending = member.status === "pending";

                    return (
                        <li key={member.id} className="ma-team-row">
                            {/* avatar, name, and email */}
                            <div className="ma-person">
                                <span
                                    className={`ma-avatar${isOwner ? " ma-avatar-owner" : ""}`}
                                    aria-hidden="true"
                                >
                                    {isPending ? <Mail size={18} strokeWidth={1.75} /> : member.initials ?? getInitials(member.name)}
                                </span>
                                <div>
                                    <p className="ma-person-name">{isPending ? member.email : member.name}</p>
                                    <p className="ma-person-detail">
                                        {isOwner && "Full access"}
                                        {!isOwner && !isPending && member.email}
                                        {isPending && `Invite sent ${member.invitedOn}`}
                                    </p>
                                </div>
                            </div>

                            <span className="ma-pill">{isOwner ? "Super Admin (owner)" : "Admin"}</span>

                            <span className="ma-visits">
                                {member.visitsThisWeek ? `${member.visitsThisWeek} visits this week` : "—"}
                            </span>

                            <span className={`ma-pill ma-status${isPending ? " ma-status-pending" : ""}`}>
                                {isPending ? "Pending" : "Active"}
                            </span>

                            {/* actions change based on the row type */}
                            <div className="ma-row-actions">
                                {isOwner && <span className="ma-muted">Can’t be removed</span>}
                                {!isOwner && !isPending && (
                                    <>
                                        <button type="button" className="ma-outline-button" onClick={() => onEdit(member)}>
                                            Edit
                                        </button>
                                        <button type="button" className="ma-outline-button" onClick={() => onRemove(member)}>
                                            Remove
                                        </button>
                                    </>
                                )}
                                {isPending && (
                                    <>
                                        <button type="button" className="ma-outline-button" onClick={() => onResend(member)}>
                                            Resend
                                        </button>
                                        <button type="button" className="ma-outline-button" onClick={() => onCancelInvite(member)}>
                                            Cancel invite
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
