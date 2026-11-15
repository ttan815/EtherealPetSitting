import NavigationBar from "../components/homepage/NavigationBar";
import { useAuth } from "../context/AuthContext";
import circleBackground from "../assets/home/hero-inner-circle.svg";
import Footer from "../components/homepage/Footer";
import BookingReviewCard from "../components/booking/review-and-pay/BookingReviewCard";
import PaymentMethodSelector from "../components/booking/review-and-pay/PaymentMethodSelector";
import PriceDetailsCard from "../components/booking/review-and-pay/PriceDetailsCard";
import ReviewPayHeader from "../components/booking/review-and-pay/ReviewPayHeader";
import { getSavedPets } from "../services/customer-dashboard/pet-service";
import "../styles/booking/ReviewPayDeposit.css";

/**
 * Renders the review-and-payment step of the booking flow.
 * @param {{booking: Object, services: Array<Object>, updateBooking: Function, onBack: Function, onContinue: Function}} props - Booking data and step controls.
 * @returns {JSX.Element} The review-and-payment page.
 */
function ReviewPayDeposit({ booking, services, updateBooking, onBack, onContinue }) {
  const { user } = useAuth();
  const pets = booking.pets ?? getSavedPets();

  return (
    <div className="review-pay-page">
      <NavigationBar role={user?.role ?? "visitor"} user={user} />
      <ReviewPayHeader />
      <main>
        <section className="review-pay-information-container" aria-label="Booking and payment summary">
          <div className="booking-pet-summaries">
            {pets.map((pet) => (
              <BookingReviewCard key={pet.id} booking={booking} services={services} pet={pet} />
            ))}
          </div>
          <div className="spacing-padding">
            <PriceDetailsCard services={services} dateKey={booking.dateKey} />
            <PaymentMethodSelector
              paymentMethod={booking.paymentMethod ?? "card"}
              onChange={(paymentMethod) => updateBooking({ paymentMethod })}
            />
          </div>
          <img src={circleBackground} className="circleRight" alt="" />
        </section>
        <div className="navigation-buttons">
          <img src={circleBackground} className="circleLeft" alt="" />
          <button type="button" className="back-btn" onClick={onBack}>
            Back
          </button>
          <button type="button" className="pay-deposit-confirm-btn" onClick={onContinue}>
            Pay Deposit &amp; Confirm
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ReviewPayDeposit;