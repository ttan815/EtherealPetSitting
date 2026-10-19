import "../styles/HomePage.css"
import NavigationBar from "../components/NavigationBar";
import ServiceSection from "../components/ServiceSection"
import AboutSection from "../components/AboutSection"
import { useAuth } from "../context/AuthContext";
const HomePage = () => {
    const { user, loading } = useAuth()
    if (loading) {
        return null;
    }
    let role = user?.role
    if (role == null) {
        role = "visitor"
    }
    return (
        <main className="home-page">
            <NavigationBar role={role} user={user} />
            <ServiceSection />
            <AboutSection />
        </main>
    );
}
export default HomePage;