// Renders the book appointment page page.
import { useNavigate } from "react-router";
import BookingLayout from "../components/booking/select-service/BookingLayout";
import BookingServiceCard from "../components/booking/select-service/BookingServiceCard";
import Button from "../components/form/Button";
import { getBookingServices } from "../services/booking/booking-service";
import arrowBackIcon from "../assets/booking/arrow-back.svg";
import "../styles/booking/BookAppointmentPage.css";

// Step 1 of booking: the customer picks one or more services (Figma "Customer - Book a Service").
// Starts with the services in the URL (e.g. from the home page "Book this service"),
// otherwise with the ones already in the booking (e.g. after "Back" from step 2).
/**
 * Renders the service-selection step of the booking flow.
 * @param {{selectedServiceIds: string[], onSelectionChange: Function, onContinue: Function}} props - Selected services and step callbacks.
 * @returns {JSX.Element} The booking service-selection page.
 */
export default function BookAppointmentPage({ selectedServiceIds, onSelectionChange, onContinue }) {
  const navigate = useNavigate();
  const services = getBookingServices();
  const hasSelectedService = selectedServiceIds.length > 0;

  function toggleService(serviceId) {
    onSelectionChange((serviceIds) =>
      serviceIds.includes(serviceId) ? serviceIds.filter((id) => id !== serviceId) : [...serviceIds, serviceId]
    );
  }

  function continueToDateTime() {
    onContinue(selectedServiceIds);
  }

  const actions = (
    <>
      <button type="button" className="book-appointment-back" onClick={() => navigate("/customer-dashboard")}>
        <img src={arrowBackIcon} alt="" />
        Return to Dashboard
      </button>

      <Button type="button" disabled={!hasSelectedService} onClick={continueToDateTime}>
        Continue to Date &amp; Time
      </Button>
    </>
  );

  return (
    <BookingLayout
      currentStep={1}
      title="Book Pet Care"
      description="Select one or more services you need for your pet. Angelena provides personalized care designed to keep your pet happy, safe, and comfortable."
      actions={actions}
    >
      <div className="book-appointment-services" role="group" aria-label="Services">
        {services.map((service) => (
          <BookingServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServiceIds.includes(service.id)}
            onToggle={toggleService}
          />
        ))}
      </div>
    </BookingLayout>
  );
}
