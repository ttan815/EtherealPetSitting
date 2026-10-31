// Renders the pet care details page page.
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import BookingLayout from "../components/booking/BookingLayout";
import BookingSummaryStrip from "../components/booking/BookingSummaryStrip";
import PetSelector from "../components/booking/PetSelector";
import PetCareForm from "../components/booking/PetCareForm";
import Button from "../components/form/Button";
import { BOOKING_SERVICES } from "../constants/booking-services";
import { useBooking } from "../hooks/useBooking";
import { fromDateKey } from "../utils/calendar-dates";
import { getSavedHouseEntry, getSavedPets } from "../utils/placeholder-pets";
import "../styles/booking/PetCareDetailsPage.css";

function createNewPet() {
  return {
    id: `new-pet-${Date.now()}`,
    isNew: true,
    name: "",
    breed: "",
    age: "",
    medication: "",
    diet: "",
    allergies: "",
    careInstructions: "",
    saveToProfile: true,
  };
}

// A pet gets its check once the sitter knows how to feed it;
// new pets also need a name and type
function isPetComplete(pet) {
  const hasBasics = !pet.isNew || (pet.name.trim() !== "" && pet.breed.trim() !== "");
  return hasBasics && pet.diet.trim() !== "";
}

// Step 3 of booking: care details for each pet (Figma "Customer - Pet & Care Details").
// Starts with all of the customer's saved pets; they can take pets out, add them back, or add a new pet.
/**
 * Renders the pet-care details step of the booking flow.
 * @returns {JSX.Element} The pet-care details page.
 */
export default function PetCareDetailsPage() {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [activePetId, setActivePetId] = useState(null);

  // Steps 1 and 2 have to be done first
  if (booking.serviceIds.length === 0) {
    return <Navigate to="/book-appointment" replace />;
  }
  if (!booking.dateKey || booking.time === null) {
    return <Navigate to="/book-appointment/date-time" replace />;
  }

  const services = BOOKING_SERVICES.filter((service) => booking.serviceIds.includes(service.id));
  const savedPets = getSavedPets();
  const pets = booking.pets ?? savedPets;
  const activePet = pets.find((pet) => pet.id === activePetId) ?? pets[0];
  const addablePets = savedPets.filter((savedPet) => !pets.some((pet) => pet.id === savedPet.id));
  const completedPetIds = pets.filter(isPetComplete).map((pet) => pet.id);
  const canContinue = completedPetIds.length === pets.length;

  function updatePets(nextPets) {
    updateBooking({ pets: nextPets });
  }

  function addPet(pet) {
    updatePets([...pets, pet]);
    setActivePetId(pet.id);
  }

  function updateActivePet(changes) {
    updatePets(pets.map((pet) => (pet.id === activePet.id ? { ...pet, ...changes } : pet)));
  }

  // TODO (later ticket): go to step 4, Review & Pay
  function continueToReview() {}

  const actions = (
    <>
      <Button variant="outline" type="button" onClick={() => navigate("/book-appointment/date-time")}>
        Back
      </Button>
      <Button type="button" disabled={!canContinue} onClick={continueToReview}>
        Continue to Review
      </Button>
    </>
  );

  return (
    <BookingLayout
      currentStep={3}
      title="Pet & Care Details"
      description="Provide specific information about your pet, medication requirements, feeding instructions, and access details."
      actions={actions}
    >
      <BookingSummaryStrip services={services} date={fromDateKey(booking.dateKey)} time={booking.time} />

      <section className="booking-panel pet-care-details" aria-labelledby="pet-selector-title">
        <PetSelector
          pets={pets}
          activePetId={activePet.id}
          completedPetIds={completedPetIds}
          addablePets={addablePets}
          onSwitch={setActivePetId}
          onRemove={(petId) => updatePets(pets.filter((pet) => pet.id !== petId))}
          onAdd={addPet}
          onAddNew={() => addPet(createNewPet())}
        />

        <PetCareForm
          key={activePet.id}
          pet={activePet}
          houseEntry={booking.houseEntry ?? getSavedHouseEntry()}
          additionalTasks={booking.additionalTasks}
          onPetChange={updateActivePet}
          onSharedChange={updateBooking}
        />
      </section>
    </BookingLayout>
  );
}
