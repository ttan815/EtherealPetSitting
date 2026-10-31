// Renders the button component.
import "../../styles/form/Button.css";

// Pill-shaped button from Figma.
// variant: "primary" (filled brown) | "outline" (brown border)
//   | "tan" (filled tan, for dark backgrounds) | "outline-light" (light border, for dark backgrounds)
// href: when given, renders a link styled as a button
// Any other props (type, onClick...) go to the <button> or <a>.
/**
 * Renders a styled button or link, depending on whether an href is supplied.
 * @param {Object} props - Button appearance, content, and native element properties.
 * @param {string} [props.variant] - Visual button variant.
 * @param {string} [props.href] - Link destination; when provided, renders a link.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {import("react").ReactNode} [props.children] - Button or link content.
 * @returns {JSX.Element} The styled button or link.
 */
function Button({ variant = "primary", href, className = "", children, ...props }) {
  const classes = `button button-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
