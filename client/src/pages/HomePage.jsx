import "../styles/HomePage.css"
import NavigationBar from "../components/NavigationBar";
import ServiceSection from "../components/ServiceSection"
import AboutSection from "../components/AboutSection"

const HomePage = () => {
    return (
        <main className="home-page">
            <NavigationBar/>
            <ServiceSection/>
            <AboutSection/>
        </main>
    );
}
export default HomePage;