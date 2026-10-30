import { useState } from "react";
import { useSearchParams } from "react-router";
import BookingLayout from "../components/booking/BookingLayout";
import BookingServiceCard from "../components/booking/BookingServiceCard";
import Button from "../components/form/Button";
import { BOOKING_SERVICES } from "../constants/booking-services";
import arrowBackIcon from "../assets/booking/arrow-back.svg";
import "../styles/BookAppointmentPage.css";

// Returns the service id from "?service=..." when it matches a real service,
// so links like the home page "Book this service" open with that card picked.
function getInitialServiceId(searchParams) {
  const serviceId = searchParams.get("service");
  const isKnownService = BOOKING_SERVICES.some((service) => service.id === serviceId);
  return isKnownService ? serviceId : null;
}

// Step 1 of booking: the customer picks one service (Figma "Customer - Book a Service").
export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [selectedServiceId, setSelectedServiceId] = useState(() => getInitialServiceId(searchParams));
  const hasSelectedService = selectedServiceId !== null;

  // TODO (later ticket): go to step 2, Date & Time, with the selected service
  function continueToDateTime() {}

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
      description="Select the service you need for your pet. Angelena provides personalized care designed to keep your pet happy, safe, and comfortable."
      actions={actions}
    >
      <div className="book-appointment-services" role="group" aria-label="Services">
        {BOOKING_SERVICES.map((service) => (
          <BookingServiceCard
            key={service.id}
            service={service}
            isSelected={service.id === selectedServiceId}
            onSelect={setSelectedServiceId}
          />
        ))}
      </div>
    </BookingLayout>
  );
}
