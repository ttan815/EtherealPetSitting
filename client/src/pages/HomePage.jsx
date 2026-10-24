import "../styles/homepage/HomePage.css"
import NavigationBar from "../components/homepage/NavigationBar";
import ServiceSection from "../components/homepage/ServiceSection"
import AboutSection from "../components/homepage/AboutSection"
import Footer from "../components/homepage/Footer"
import ReviewsSection from "../components/homepage/ReviewSection";
import HomeBannerSection from "../components/homepage/HomeBannerSection"

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
    // Nav and footer sit outside <main> so <main> holds only the page content
    return (
        <>
            <NavigationBar role={role} user={user} />
            <main className="home-page">
                <HomeBannerSection/>
                <ServiceSection/>
                <AboutSection/>
                <ReviewsSection />
            </main>
            <Footer/>
        </>
    );
}
export default HomePage;