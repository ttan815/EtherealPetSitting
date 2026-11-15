import NavigationBar from "../components/homepage/NavigationBar";
import { useAuth } from "../context/AuthContext";
import circleBackground from "../assets/home/hero-inner-circle.svg";
import Footer from "../components/homepage/Footer";
import BookingReviewCard from "../components/booking/review-and-pay/BookingReviewCard";
import PaymentMethodSelector from "../components/booking/review-and-pay/PaymentMethodSelector";
import PriceDetailsCard from "../components/booking/review-and-pay/PriceDetailsCard";
import ReviewPayHeader from "../components/booking/review-and-pay/ReviewPayHeader";
import "../styles/booking/ReviewPayDeposit.css";

/**
 * Renders the review-and-payment step of the booking flow.
 * @param {{booking: Object, services: Array<Object>, updateBooking: Function, onBack: Function, onContinue: Function}} props - Booking data and step controls.
 * @returns {JSX.Element} The review-and-payment page.
 */
function ReviewPayDeposit({ booking, services, appointments = [], updateBooking, onBack, onContinue, onAddAnother, onDeleteAppointment }) {
  const { user } = useAuth();
  const serviceById = new Map(services.map((service) => [service.id, service]));

  return (
    <div className="review-pay-page">
      <NavigationBar role={user?.role ?? "visitor"} user={user} />
      <ReviewPayHeader />
      <main>
        <section className="review-pay-information-container" aria-label="Booking and payment summary">
          <div className="booking-pet-summaries">
            {appointments.length > 0
              ? appointments.map((appointment) => {
                  const service = serviceById.get(appointment.serviceId);
                  const appointmentPets = appointment.pets ?? [];
                  return appointmentPets.map((pet) => (
                    <BookingReviewCard
                      key={`${appointment.id}-${pet.id}`}
                      booking={appointment}
                      services={service ? [service] : []}
                      pet={pet}
                      onDelete={onDeleteAppointment ? () => onDeleteAppointment(appointment.id) : undefined}
                    />
                  ));
                })
              : (booking.pets ?? []).map((pet) => (
                  <BookingReviewCard
                    key={pet.id}
                    booking={booking}
                    services={services}
                    pet={pet}
                    onDelete={onDeleteAppointment ? () => onDeleteAppointment(booking.serviceIds[0]) : undefined}
                  />
                ))}
          </div>
          <div className="spacing-padding">
            <PriceDetailsCard services={services} dateKey={booking.dateKey} appointments={appointments} />
            <PaymentMethodSelector
              paymentMethod={booking.paymentMethod ?? "card"}
              onChange={(paymentMethod) => updateBooking({ paymentMethod })}
            />
          </div>
          {onAddAnother && (
            <button type="button" className="back-btn add-another-service-button" onClick={onAddAnother}>
              Add Another Service
            </button>
          )}
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