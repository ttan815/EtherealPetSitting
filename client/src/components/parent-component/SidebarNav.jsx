import "../../styles/parent-component/SidebarNav.css";


/**
 * Renders the customized dashboard section navigation.
 * @param {Object} NAV_ITEMS - Map of Navigation Items
 * @param {Object} props - Active section, navigation callback, and optional notification counts.
 * @param {string} props.activeSection - ID of the currently selected section.
 * @param {Function} props.onSelect - Called with a section ID when selected.
 * @param {Object.<string, number>} props.notificationCounts - Pending notification counts by section ID.
 * @param {String} subtitle - Subtitle
 * @returns {JSX.Element} The dashboard sidebar navigation.
 */
function SidebarNav({ NAV_ITEMS, activeSection, onSelect, subtitle, notificationCounts = {} }) {
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
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const notificationCount = notificationCounts[id] ?? 0;
          const badgeLabel = notificationCount > 9 ? "9+" : notificationCount;

          return (
          <li key={id}>
            <button
              type="button"
              aria-current={activeSection === id ? "page" : undefined}
              className={`nav-item${activeSection === id ? " active" : ""}`}
              onClick={() => onSelect(id)}
            >
              <Icon className="nav-icon" strokeWidth={1.75} aria-hidden="true" />
              <span className="nav-label">{label}</span>
              {notificationCount > 0 && (
                <span className="nav-notification-badge" aria-label={`${notificationCount} pending requests`}>
                  {badgeLabel}
                </span>
              )}
            </button>
          </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SidebarNav;