import SidebarProfile from "../components/SidebarProfile";
import CustomerSidebarNav from "../components/CustomerSidebarNav";

export default function CustomerDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside className="customer-sidebar">
        <CustomerSidebarNav />
        <SidebarProfile name="Maya Rivera" role="Customer account" />
      </aside>
      <main style={{ flex: 1, padding: 40, background: "#f9efed" }}>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}