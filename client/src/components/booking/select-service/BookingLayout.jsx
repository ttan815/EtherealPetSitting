// Renders the booking layout component.
import NavigationBar from "../../homepage/NavigationBar";
import Footer from "../../homepage/Footer";
import BookingHeader from "./BookingHeader";
import { useAuth } from "../../../context/AuthContext";
import circleLeft from "../../../assets/booking/shape-circle-left.svg";
import circleRight from "../../../assets/booking/shape-circle-right.svg";
import "../../../styles/booking/BookingLayout.css";

// Page frame shared by every booking step: nav, title band with step tracker,
// content area with soft background circles, bottom button row, and footer.
// currentStep, title, description: passed to the title band
// actions: buttons for the bottom row (e.g. back on the left, continue on the right)
// children: the step's own content (service cards, calendar, ...)
/**
 * Renders the shared booking-step page layout and its navigation actions.
 * @param {Object} props - Step content and navigation.
 * @param {number} props.currentStep - The current step number.
 * @param {string} props.title - The step heading.
 * @param {string} props.description - Supporting step description.
 * @param {import("react").ReactNode} props.actions - Step navigation actions.
 * @param {import("react").ReactNode} props.children - The main step content.
 * @returns {JSX.Element} The booking-step layout.
 */
function BookingLayout({ currentStep, title, description, actions, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <>
      <NavigationBar role={user?.role ?? "visitor"} user={user} />

      <main className="booking-layout">
        <BookingHeader currentStep={currentStep} title={title} description={description} />

        <div className="booking-layout-content">
          <div className="booking-layout-shapes" aria-hidden="true">
            <img className="booking-layout-shape booking-layout-shape-left" src={circleLeft} alt="" />
            <img className="booking-layout-shape booking-layout-shape-right" src={circleRight} alt="" />
          </div>

          <div className="booking-layout-inner">
            {children}
            <div className="booking-layout-actions">{actions}</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookingLayout;
