import "../styles/SectionHeading.css";

// Small uppercase label, serif title and optional intro text that start
// each home page section (Figma "Section Header").
// align: "center" | "left"
// id: put on the title so the section can use aria-labelledby
// children: extra content under the title (e.g. the reviews rating summary)
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
