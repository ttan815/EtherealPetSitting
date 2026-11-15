import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useBooking } from "../../hooks/useBooking";
import { NO_PREFERENCE_SITTER_ID } from "../../constants/booking-sitters";
import BookAppointmentPage from "../../pages/BookAppointmentPage";
import SelectDateTimePage from "../../pages/SelectDateTimePage";
import PetCareDetailsPage from "../../pages/PetCareDetailsPage";
import BookingConfirmation from "./confirmation/BookingConfirmation";
import { getServiceIdsFromQuery } from "../../utils/service-query";
import { getBookingServices, getBookingSitters } from "../../services/booking-service";

/**
 * Renders booking stages and routes the payment stage separately.
 * @returns {JSX.Element} The active booking stage.
 */
export default function BookingFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, updateBooking } = useBooking();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(() => location.state?.step ?? 1);
  const [serviceSelection, setServiceSelection] = useState(() => {
    const serviceIdsFromUrl = getServiceIdsFromQuery(searchParams);
    return serviceIdsFromUrl.length > 0 ? serviceIdsFromUrl : booking.serviceIds;
  });
  const services = getBookingServices().filter((service) => booking.serviceIds.includes(service.id));

  function continueFromServices(serviceIds) {
    const compatibleSitter = getBookingSitters().some(
      (sitter) =>
        sitter.id === booking.sitterId &&
        (!sitter.serviceIds || serviceIds.every((serviceId) => sitter.serviceIds.includes(serviceId)))
    );
    updateBooking({
      serviceIds,
      sitterId: compatibleSitter ? booking.sitterId : NO_PREFERENCE_SITTER_ID,
      dateKey: null,
      time: null,
    });
    setStep(2);
  }

  if (step === 1) {
    return (
      <BookAppointmentPage
        selectedServiceIds={serviceSelection}
        onSelectionChange={setServiceSelection}
        onContinue={continueFromServices}
      />
    );
  }

  if (step === 2) {
    return (
      <SelectDateTimePage
        booking={booking}
        updateBooking={updateBooking}
        onBack={() => setStep(1)}
        onContinue={() => setStep(3)}
      />
    );
  }

  if (step === 3) {
    return (
      <PetCareDetailsPage
        booking={booking}
        updateBooking={updateBooking}
        onBack={() => setStep(2)}
        onContinue={() => navigate("/payment/new-booking")}
      />
    );
  }

  return <BookingConfirmation booking={booking} services={services} />;
}
