import {
  LayoutGrid, CalendarDays, PawPrint, User,
  CalendarPlus, ClipboardList, Star, CircleDollarSign,
} from "lucide-react";
import SidebarNav from "../parent-component/SidebarNav";


const NAV_ITEMS = [
];


function OwnerSidebarNav () {
    return (
        <SidebarNav NAV_ITEMS={NAV_ITEMS} subtitle={"Owner"}/>
    );
}

export default OwnerSidebarNav;