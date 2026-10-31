// Renders the book appointment page page.
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import BookingLayout from "../components/booking/BookingLayout";
import BookingServiceCard from "../components/booking/BookingServiceCard";
import Button from "../components/form/Button";
import { BOOKING_SERVICES } from "../constants/booking-services";
import { useBooking } from "../hooks/useBooking";
import { getServiceIdsFromQuery } from "../utils/service-query";
import arrowBackIcon from "../assets/booking/arrow-back.svg";
import "../styles/booking/BookAppointmentPage.css";

// Step 1 of booking: the customer picks one or more services (Figma "Customer - Book a Service").
// Starts with the services in the URL (e.g. from the home page "Book this service"),
// otherwise with the ones already in the booking (e.g. after "Back" from step 2).
/**
 * Renders the service-selection step of the booking flow.
 * @returns {JSX.Element} The booking service-selection page.
 */
export default function BookAppointmentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { booking, updateBooking } = useBooking();
  const [selectedServiceIds, setSelectedServiceIds] = useState(() => {
    const serviceIdsFromUrl = getServiceIdsFromQuery(searchParams);
    return serviceIdsFromUrl.length > 0 ? serviceIdsFromUrl : booking.serviceIds;
  });
  const hasSelectedService = selectedServiceIds.length > 0;

  function toggleService(serviceId) {
    setSelectedServiceIds((serviceIds) =>
      serviceIds.includes(serviceId) ? serviceIds.filter((id) => id !== serviceId) : [...serviceIds, serviceId]
    );
  }

  function continueToDateTime() {
    updateBooking({ serviceIds: selectedServiceIds });
    navigate("/book-appointment/date-time");
  }

  const actions = (
    <>
      {/* TODO: link to the customer dashboard once that page exists */}
      <button type="button" className="book-appointment-back">
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
        {BOOKING_SERVICES.map((service) => (
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
