import { useEffect, useRef, useState } from "react";

// Turns "Example Name" into "EN" (falls back to "?")
function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0].toUpperCase());
  return initials.join("") || "?";
}

function ProfileMenu({ role, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isAdmin = role === "admin";
  const dashboardLabel = isAdmin ? "Admin Dashboard" : "My Dashboard";
  const dashboardHref = isAdmin ? "/admin-dashboard" : "/customer-dashboard";

  // Close the dropdown when clicking anywhere outside it, or pressing Escape.
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function handleLogout() {
    setIsOpen(false);
    if (onLogout) onLogout();
  }

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        type="button"
        className={`profile-trigger ${isOpen ? "is-open" : ""}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open profile menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="profile-avatar">
          {user?.photoUrl ? (
            <img src={user.photoUrl} alt="" />
          ) : (
            getInitials(user?.name)
          )}
        </span>
        <svg className="profile-chevron" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1.5 6 6.5 11 1.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="profile-dropdown" role="menu">
          <a href={dashboardHref} className="profile-item" role="menuitem">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
              <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
              <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
              <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
            </svg>
            {dashboardLabel}
          </a>
          <div className="profile-divider" />
          <button
            type="button"
            className="profile-item"
            role="menuitem"
            onClick={handleLogout}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 5h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4" />
              <path d="M11 8l-4 4 4 4" />
              <path d="M7 12h9" />
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
