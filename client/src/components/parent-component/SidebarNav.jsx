import "../../styles/parent-component/SidebarNav.css";


/**
 * Renders the customized dashboard section navigation.
 * @param {Object} NAV_ITEMS - Map of Navigation Items
 * @param {Object} props - Active section and navigation callback.
 * @param {string} props.activeSection - ID of the currently selected section.
 * @param {Function} props.onSelect - Called with a section ID when selected.
 * @param {String} subtitle - Subtitle
 * @returns {JSX.Element} The dashboard sidebar navigation.
 */
function SidebarNav( { NAV_ITEMS, activeSection, onSelect, subtitle } ) {
    return (
    <nav aria-label="Customer navigation">
      <a className="sidebar-brand" href="/">
        <img src="/sidebar-logo.svg" alt="" className="sidebar-logo" />
        <div className="brand-text">
          <p className="brand-title">Ethereal</p>
          <p className="brand-subtitle">{subtitle}</p>
        </div>
      </a>

      <p className="sidebar-section-label">Your Care Space</p>

      <ul className="nav-list">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              type="button"
              aria-current={activeSection === id ? "page" : undefined}
              className={`nav-item${activeSection === id ? " active" : ""}`}
              onClick={() => onSelect(id)}
            >
              <Icon className="nav-icon" strokeWidth={1.75} aria-hidden="true" />
              <span className="nav-label">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SidebarNav;