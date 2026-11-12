// Renders the customer sidebar nav component.
import SidebarNav from "../parent-component/SidebarNav";
import { CUSTOMER_NAV_ITEMS } from "../../constants/customer-nav-items";

/**
 * Renders the Customer dashboard section navigation.
 * @param {Object} props - Active section and navigation callback.
 * @param {string} props.activeSection - ID of the currently selected section.
 * @param {Function} props.onSelect - Called with a section ID when selected.
 * @returns {JSX.Element} The dashboard sidebar navigation.
 */
export default function CustomerSidebarNav({ activeSection, onSelect }) {
  return (
    <SidebarNav NAV_ITEMS={CUSTOMER_NAV_ITEMS} activeSection={activeSection} onSelect={onSelect} subtitle={"Customer Care"}/>
  );
}