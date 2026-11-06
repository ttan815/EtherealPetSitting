// Renders the sidebar profile component.
import { useState } from "react";
import "../../styles/customer-dashboard/SidebarProfile.css";

function LogoutIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 8l-4 4 4 4" />
      <path d="M6 12h10" />
    </svg>
  );
}

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Renders the customer's profile summary and sign-out action.
 * @param {Object} props - Profile display name and logout callback.
 * @param {string} [props.name] - Customer name used in the profile display.
 * @param {Function} props.onLogout - Called when the customer chooses to log out.
 * @returns {JSX.Element} The sidebar profile panel.
 */
export default function SidebarProfile({ name = "Maya Rivera", onLogout, role }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(false);
    if (onLogout) onLogout(); // parent calls the logout API + redirects
  };

  return (
    <>
      {/* Profile card */}
      <div className="profile-card">
        <div className="profile-avatar" aria-hidden="true">{getInitials(name)}</div>
        <div className="profile-text">
          <p className="profile-name">{name}</p>
          <p className="profile-role">{role}</p>
        </div>
        <button
          type="button"
          className="profile-logout-btn"
          aria-label="Log out"
          onClick={() => setShowConfirm(true)}
        >
          <LogoutIcon />
        </button>
      </div>

      {/* "Log out?" popup over a dimmed background */}
      {showConfirm && (
        <div className="logout-overlay">
          <div
            className="logout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <div className="logout-modal-icon">
              <LogoutIcon size={26} />
            </div>
            <h2 id="logout-title" className="logout-modal-title">Log out?</h2>
            <p className="logout-modal-text">
              You will need to log in again to access your customer account.
            </p>
            <div className="logout-modal-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="btn-logout" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}