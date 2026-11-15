import SidebarNav from "../parent-component/SidebarNav";
import { OWNER_NAV_ITEMS } from "../../constants/owner/owner-nav-items";

/**
 * Renders the owner dashboard sidebar navigation.
 * @param {string} activeSection - ID of the currently selected section.
 * @param {Function} onSelect - Called with a section ID when selected.
 * @param {number[]} pendingRequestCount - Counts for pending requests by category.
 * @returns {JSX.Element} The dashboard sidebar navigation.
 */
function OwnerSidebarNav({ activeSection, onSelect, pendingRequestCount }) {
    return (
        <SidebarNav
            NAV_ITEMS={OWNER_NAV_ITEMS}
            subtitle={"Owner"}
            activeSection={activeSection}
            onSelect={onSelect}
            notificationCounts={{
                appointments: pendingRequestCount[0],
                availability: pendingRequestCount[1],
            }}
        />
    );
}

export default OwnerSidebarNav;