import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useBooking } from "../hooks/useBooking";
import { getBookingServices } from "../services/booking-service";
import BookingConfirmation from "../components/booking/confirmation/BookingConfirmation";
import ReviewPayDeposit from "./ReviewPayDepositPage";

/**
 * Renders the payment step for a booking or an existing appointment.
 * @returns {JSX.Element} The payment page.
 */
export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const services = getBookingServices().filter((service) => booking.serviceIds.includes(service.id));
  const isNewBooking = id === "new-booking";

  if (isConfirmed) {
    return <BookingConfirmation booking={booking} services={services} />;
  }

  return (
    <ReviewPayDeposit
      booking={booking}
      services={services}
      updateBooking={updateBooking}
      onBack={() =>
        navigate(isNewBooking ? "/book-appointment" : "/customer-dashboard", {
          state: isNewBooking ? { step: 3 } : undefined,
        })
      }
      onContinue={() => setIsConfirmed(true)}
    />
  );
}
