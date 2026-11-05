import OwnerSidebarNav from "../components/owner-dashboard/OwnerSidebarNav";

const SECTION_TITLES = {
    profile: "Manage Personal Information",
    book: "Book an Appointment",
    tasks: "Additional Task",
    review: "Write a Review",
};



function OwnerDashboard() {
    return (
        <OwnerSidebarNav/>
    );
}

export default OwnerDashboard;