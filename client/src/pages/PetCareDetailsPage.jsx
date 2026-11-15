// Renders the pet care details page page.
import { useState } from "react";
import BookingLayout from "../components/booking/select-service/BookingLayout";
import BookingSummaryStrip from "../components/booking/select-pet/BookingSummaryStrip";
import PetSelector from "../components/booking/select-pet/PetSelector";
import PetCareForm from "../components/booking/select-pet/PetCareForm";
import Button from "../components/form/Button";
import { BOOKING_SERVICES } from "../constants/booking-services";
import { fromDateKey } from "../utils/calendar-dates";
import { getSavedHouseEntry, getSavedPets } from "../services/pet-service";
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
 * @param {{booking: Object, updateBooking: Function, onBack: Function, onContinue: Function}} props - Booking data and step controls.
 * @returns {JSX.Element} The pet-care details page.
 */
export default function PetCareDetailsPage({ booking, updateBooking, onBack, onContinue }) {
  const [activePetId, setActivePetId] = useState(null);

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

  const actions = (
    <>
      <Button variant="outline" type="button" onClick={onBack}>
        Back
      </Button>
      <Button type="button" disabled={!canContinue} onClick={onContinue}>
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
