import "../../styles/form/Button.css";

// Pill-shaped button from Figma.
// variant: "primary" (filled brown) | "outline" (brown border)
//   | "tan" (filled tan, for dark backgrounds) | "outline-light" (light border, for dark backgrounds)
// href: when given, renders a link styled as a button
// Any other props (type, onClick...) go to the <button> or <a>.
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
