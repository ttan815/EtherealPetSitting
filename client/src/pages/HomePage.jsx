import "../styles/HomePage.css"
import NavigationBar from "../components/NavigationBar";
import ServiceSection from "../components/ServiceSection"
import AboutSection from "../components/AboutSection"
import Footer from "../components/Footer"

const HomePage = () => {
    return (
        <main className="home-page">
            <NavigationBar/>
            <ServiceSection/>
            <AboutSection/>
            <Footer/>
        </main>
    );
}
export default HomePage;