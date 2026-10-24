import "../../styles/auth/AuthDivider.css";

// Short text with a line on each side, e.g. "New here?" between two buttons.
// className: lets the page add its own spacing
function AuthDivider({ className = "", children }) {
  return <div className={`auth-divider ${className}`.trim()}>{children}</div>;
}

export default AuthDivider;
