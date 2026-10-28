import SidebarProfile from "../components/SidebarProfile";

export default function CustomerDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 264, background: "#2f1f04", padding: 18,
                      display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <SidebarProfile name="Maya Rivera" />
      </aside>
      <main style={{ flex: 1, padding: 40, background: "#f9efed" }}>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}