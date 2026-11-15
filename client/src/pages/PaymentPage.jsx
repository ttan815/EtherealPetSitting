import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useBooking } from "../hooks/useBooking";
import { getBookingServices } from "../services/booking/booking-service";
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
  const appointments = booking.appointments?.length
    ? booking.appointments
    : booking.serviceIds.map((serviceId) => ({
        id: serviceId,
        serviceId,
        dateKey: booking.dateKey,
        time: booking.time,
        pets: booking.pets,
        houseEntry: booking.houseEntry,
        additionalTasks: booking.additionalTasks,
      }));

  function deleteAppointment(appointmentId) {
    const remainingAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    const firstAppointment = remainingAppointments[0];
    const serviceIds = remainingAppointments.map((appointment) => appointment.serviceId);

    updateBooking({
      appointments: remainingAppointments,
      activeAppointmentIndex: Math.min(booking.activeAppointmentIndex ?? 0, Math.max(remainingAppointments.length - 1, 0)),
      serviceIds,
      sitterId: firstAppointment?.sitterId ?? booking.sitterId,
      dateKey: firstAppointment?.dateKey ?? null,
      time: firstAppointment?.time ?? null,
      pets: firstAppointment?.pets ?? null,
      houseEntry: firstAppointment?.houseEntry ?? null,
      additionalTasks: firstAppointment?.additionalTasks ?? "",
    });
  }

  if (isConfirmed) {
    return <BookingConfirmation booking={booking} services={services} />;
  }

  return (
    <ReviewPayDeposit
      booking={booking}
      appointments={appointments}
      services={services}
      updateBooking={updateBooking}
      onBack={() =>
        navigate(isNewBooking ? "/book-appointment" : "/customer-dashboard", {
          state: isNewBooking ? { step: 3 } : undefined,
        })
      }
      onAddAnother={() => navigate("/book-appointment", { state: { addAnotherService: true } })}
      onDeleteAppointment={deleteAppointment}
      onContinue={() => setIsConfirmed(true)}
    />
  );
}
