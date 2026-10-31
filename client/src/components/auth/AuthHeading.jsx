// Renders the auth heading component.
import "../../styles/auth/AuthHeading.css";

// Big serif title with a short line under it, used at the top of auth forms.
/**
 * Renders the title and supporting text for an authentication page.
 * @param {Object} props - Heading text.
 * @param {string} props.title - The main heading.
 * @param {string} props.subtitle - Supporting description beneath the heading.
 * @returns {JSX.Element} The authentication heading.
 */
function AuthHeading({ title, subtitle }) {
  return (
    <div className="auth-heading">
      <h1 className="auth-heading-title">{title}</h1>
      <p className="auth-heading-subtitle">{subtitle}</p>
    </div>
  );
}

export default AuthHeading;
