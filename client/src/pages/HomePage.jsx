import "../styles/HomePage.css"
import NavigationBar from "../components/NavigationBar";
import ServiceSection from "../components/ServiceSection"
import AboutSection from "../components/AboutSection"
import Footer from "../components/Footer"
import ReviewsSection from "../components/ReviewSection";

const HomePage = () => {
    return (
        <main className="home-page">
            <NavigationBar/>
            <ServiceSection/>
            <AboutSection/>
            <ReviewsSection />
            <Footer/>
        </main>
    );
}
export default HomePage;