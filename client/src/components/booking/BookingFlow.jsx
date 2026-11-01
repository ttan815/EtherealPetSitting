import { useState } from "react";
import { useSearchParams } from "react-router";
import { useBooking } from "../../hooks/useBooking";
import { BOOKING_SERVICES } from "../../constants/booking-services";
import { BOOKING_SITTERS, NO_PREFERENCE_SITTER_ID } from "../../constants/booking-sitters";
import BookAppointmentPage from "../../pages/BookAppointmentPage";
import SelectDateTimePage from "../../pages/SelectDateTimePage";
import PetCareDetailsPage from "../../pages/PetCareDetailsPage";
import ReviewPayDeposit from "../../pages/ReviewPayDepositPage";
import BookingConfirmation from "./confirmation/BookingConfirmation";
import { getServiceIdsFromQuery } from "../../utils/service-query";

/**
 * Renders each booking stage in the same route while sharing the current booking data.
 * @returns {JSX.Element} The active booking stage.
 */
export default function BookingFlow() {
  const { booking, updateBooking } = useBooking();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [serviceSelection, setServiceSelection] = useState(() => {
    const serviceIdsFromUrl = getServiceIdsFromQuery(searchParams);
    return serviceIdsFromUrl.length > 0 ? serviceIdsFromUrl : booking.serviceIds;
  });
  const services = BOOKING_SERVICES.filter((service) => booking.serviceIds.includes(service.id));

  function continueFromServices(serviceIds) {
    const compatibleSitter = BOOKING_SITTERS.some(
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
        onContinue={() => setStep(4)}
      />
    );
  }

  if (step === 4) {
    return (
      <ReviewPayDeposit
        booking={booking}
        services={services}
        updateBooking={updateBooking}
        onBack={() => setStep(3)}
        onContinue={() => setStep(5)}
      />
    );
  }

  return <BookingConfirmation booking={booking} services={services} />;
}
