// Renders the section heading component.
import "../../styles/homepage/SectionHeading.css";

// Small uppercase label, serif title and optional intro text that start
// each home page section (Figma "Section Header").
// align: "center" | "left"
// id: put on the title so the section can use aria-labelledby
// children: extra content under the title (e.g. the reviews rating summary)
/**
 * Renders a reusable section heading with optional supporting content.
 * @param {Object} props - Heading text, alignment, and content.
 * @param {string} [props.eyebrow] - Small label displayed above the title.
 * @param {string} props.title - Main section title.
 * @param {string} [props.subtitle] - Supporting description beneath the title.
 * @param {string} [props.align] - Text alignment variant.
 * @param {string} [props.id] - Optional heading section ID.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {import("react").ReactNode} [props.children] - Additional content below the heading.
 * @returns {JSX.Element} The section heading.
 */
function SectionHeading({ eyebrow, title, subtitle, align = "center", id, className = "", children }) {
  return (
    <div className={`section-heading section-heading-${align} ${className}`.trim()}>
      <p className="section-heading-eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-heading-title">{title}</h2>
      {subtitle && <p className="section-heading-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

export default SectionHeading;
