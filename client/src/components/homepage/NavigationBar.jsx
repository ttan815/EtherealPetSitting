// Renders the navigation bar component.
import { useState } from "react";
import { Link } from "react-router";
import ProfileMenu from "./ProfileMenu";
import BrandLogo from "./BrandLogo";
import { HOMEPAGE_SECTION_LINKS } from "../../constants/homepage/homepage";
import "../../styles/homepage/NavigationBar.css";

// role: "visitor" | "customer" | "admin"
// user: { name: "Example Name" } for logged-in users (used for initials)
// onLogout: called when the user picks "Log out" in the profile menu
/**
 * Renders the site navigation for visitors or signed-in customers.
 * @param {Object} props - User identity, role, and logout action.
 * @param {string} [props.role] - The current user's role or visitor state.
 * @param {Object|null} [props.user] - Signed-in user data used in navigation.
 * @param {Function} [props.onLogout] - Called when the user signs out.
 * @returns {JSX.Element} The responsive site navigation.
 */
function NavigationBar({ role = "visitor", user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile menu

  const isVisitor = role === "visitor";
  const isCustomer = role === "customer";
  const isAdmin = role === "admin" || role === "super_admin";

  // Visitors are sent to log in before they can book.
  const bookAppointmentHref = isVisitor ? "/login" : "/book-appointment";

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navigation-bar">
      <div className="navigation-inner">
        <a href="#home" className="navigation-logo" onClick={closeMenu}>
          <BrandLogo size="large" />
        </a>

        <button
          type="button"
          className="navigation-toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navigation-menu ${isMenuOpen ? "is-open" : ""}`}>
          <ul className="navigation-links">
            {HOMEPAGE_SECTION_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}

            {isVisitor && (
              <>
                <li>
                  <a href="/login">Log in</a>
                </li>
                <li>
                  <a href="/create-account">Create account</a>
                </li>
              </>
            )}

            {isCustomer && (
              <li>
                <a href="/customer-dashboard">My account</a>
              </li>
            )}
          </ul>

          <div className="navigation-actions">
            {isAdmin ? (
              <a href="/admin-dashboard" className="navigation-button">
                Admin dashboard
              </a>
            ) : (
              <a href={bookAppointmentHref} className="navigation-button">
                Book an appointment
              </a>
            )}

            {!isVisitor && (
              <ProfileMenu role={role} user={user} onLogout={onLogout} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavigationBar;
