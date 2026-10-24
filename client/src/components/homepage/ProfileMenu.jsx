import { useEffect, useRef, useState } from "react";
import chevronDownIcon from "../../assets/icons/chevron-down.svg";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import logOutIcon from "../../assets/icons/log-out.svg";

// Turns "Example Name" into "EN" (falls back to "?")
function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0].toUpperCase());
  return initials.join("") || "?";
}

function ProfileMenu({ role, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isAdmin = role === "admin" || role === "super_admin";
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
            getInitials(user?.firstName + " " + user?.lastName)
          )}
        </span>
        <img className="profile-chevron" src={chevronDownIcon} alt="" />
      </button>

      {isOpen && (
        <div className="profile-dropdown" role="menu">
          <a href={dashboardHref} className="profile-item" role="menuitem">
            <img src={dashboardIcon} alt="" />
            {dashboardLabel}
          </a>
          <div className="profile-divider" />
          <button
            type="button"
            className="profile-item"
            role="menuitem"
            onClick={handleLogout}
          >
            <img src={logOutIcon} alt="" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
