// Renders the auth divider component.
import "../../styles/auth/AuthDivider.css";

// Short text with a line on each side, e.g. "New here?" between two buttons.
// className: lets the page add its own spacing
/**
 * Renders a divider with optional supporting content for an authentication form.
 * @param {Object} props - Divider content and styling.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {import("react").ReactNode} [props.children] - Content displayed in the divider.
 * @returns {JSX.Element} The styled authentication divider.
 */
function AuthDivider({ className = "", children }) {
  return <div className={`auth-divider ${className}`.trim()}>{children}</div>;
}

export default AuthDivider;
