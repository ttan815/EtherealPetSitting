import "../../../styles/booking/BookingConfirmation.css";
import heroTopoLeft from "../../../assets/home/hero-topo-left.svg";
import heroTopoRight from "../../../assets/home/hero-topo-right.svg";
import rightArrow from "../../../assets/icons/arrow-right.svg";
import circleBackground from "../../../assets/home/hero-inner-circle.svg";
import Footer from "../../homepage/Footer";
import ConfirmationSummaryCard from "./ConfirmationSummaryCard";
import ConfirmationActions from "./ConfirmationActions";

/**
 * Renders the final confirmation screen for a completed booking.
 * @param {{booking: Object, services: Array<Object>}} props - Confirmed booking data.
 * @returns {JSX.Element} The booking confirmation page.
 */
function BookingConfirmation({ booking, services }) {
  const petName = booking.pets?.[0]?.name || "your pet";

  return (
    <div className="booking-confirmation-page">
      <header className="confirmation-header">
        <img src={heroTopoLeft} className="confirmation-topo-left" alt="" />
        <img src={heroTopoRight} className="confirmation-topo-right" alt="" />
        <div className="confirmation-header-content">
          <img className="confirmation-icon" src={rightArrow} alt="" />
          <h1 className="confirmation-title">Your Appointment Is Confirmed</h1>
          <p className="confirmation-thank-you">
            Thank you for trusting Ethereal Pet Sitting. {petName} is in loving,
            professional hands. A copy of this confirmation has been sent to
            your email.
          </p>
        </div>
      </header>
      <section className="confirmation-summary-section" aria-label="Confirmed booking summary">
        <ConfirmationSummaryCard booking={booking} services={services} />
        <img src={circleBackground} className="confirmation-circle-right" alt="" />
      </section>
      <div className="confirmation-actions">
        <img src={circleBackground} className="confirmation-circle-left" alt="" />
        <ConfirmationActions />
      </div>
      <Footer />
    </div>
  );
}

export default BookingConfirmation;
