import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useBooking } from "../../hooks/useBooking";
import { NO_PREFERENCE_SITTER_ID } from "../../constants/booking/booking-sitters";
import BookAppointmentPage from "../../pages/BookAppointmentPage";
import SelectDateTimePage from "../../pages/SelectDateTimePage";
import PetCareDetailsPage from "../../pages/PetCareDetailsPage";
import { getServiceIdsFromQuery } from "../../utils/service-query";

/**
 * Renders booking stages and routes the payment stage separately.
 * @returns {JSX.Element} The active booking stage.
 */
export default function BookingFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(() => location.state?.step ?? 1);
  const [serviceSelection, setServiceSelection] = useState(() => {
    const serviceIdsFromUrl = getServiceIdsFromQuery(searchParams);
    return location.state?.addAnotherService ? [] : serviceIdsFromUrl.length > 0 ? serviceIdsFromUrl : booking.serviceIds;
  });
  const legacyAppointments = booking.serviceIds.map((serviceId) => ({
    id: serviceId,
    serviceId,
    sitterId: booking.sitterId,
    dateKey: booking.dateKey,
    time: booking.time,
    pets: booking.pets,
    houseEntry: booking.houseEntry,
    additionalTasks: booking.additionalTasks,
  }));
  const appointments = booking.appointments?.length ? booking.appointments : legacyAppointments;
  const activeAppointmentIndex = Math.min(booking.activeAppointmentIndex ?? 0, Math.max(appointments.length - 1, 0));
  const activeAppointment = appointments[activeAppointmentIndex];

  function updateAppointment(index, changes) {
    const nextAppointments = [...appointments];
    nextAppointments[index] = { ...nextAppointments[index], ...changes };
    updateBooking({ appointments: nextAppointments });
  }

  function continueFromServices(serviceIds) {
    const serviceId = serviceIds[0];
    const existingAppointments = booking.appointments?.length ? booking.appointments : legacyAppointments;
    const existingIndex = existingAppointments.findIndex((item) => item.serviceId === serviceId);
    const nextAppointments = [...existingAppointments];
    const appointment = existingIndex >= 0
      ? nextAppointments[existingIndex]
      : { id: `${serviceId}-${Date.now()}`, serviceId, sitterId: NO_PREFERENCE_SITTER_ID, dateKey: null, time: null, pets: null, houseEntry: null, additionalTasks: "" };
    const nextIndex = existingIndex >= 0 ? existingIndex : nextAppointments.length;
    if (existingIndex < 0) nextAppointments.push(appointment);
    updateBooking({ appointments: nextAppointments, activeAppointmentIndex: nextIndex });
    setStep(2);
  }

  function startAnotherService() {
    setServiceSelection([]);
    setStep(1);
  }

  function finishAppointment() {
    updateBooking({
      serviceIds: appointments.map((item) => item.serviceId),
      dateKey: appointments[0]?.dateKey ?? null,
      time: appointments[0]?.time ?? null,
      pets: appointments[0]?.pets ?? null,
    });
    navigate("/payment/new-booking");
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
    if (!activeAppointment) return null;
    return (
      <SelectDateTimePage
        booking={{ ...booking, ...activeAppointment, serviceIds: [activeAppointment.serviceId] }}
        updateBooking={(changes) => updateAppointment(activeAppointmentIndex, changes)}
        onBack={() => setStep(1)}
        onContinue={() => setStep(3)}
      />
    );
  }

  if (step === 3) {
    if (!activeAppointment) return null;
    return (
      <PetCareDetailsPage
        booking={{ ...booking, ...activeAppointment, serviceIds: [activeAppointment.serviceId] }}
        updateBooking={(changes) => updateAppointment(activeAppointmentIndex, changes)}
        onBack={() => setStep(2)}
        onContinue={finishAppointment}
        onAddAnother={startAnotherService}
      />
    );
  }

  return null;
}
