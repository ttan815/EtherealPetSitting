// Renders the pet care form component.
import TextField from "../form/TextField";
import TextAreaField from "../form/TextAreaField";
import Checkbox from "../form/Checkbox";
import "../../styles/form/PetCareForm.css";

const SHARED_HINT = "Applies to all pets in this booking.";

// Care form for the pet picked in PetSelector (Figma "Pet & Care Details" fields).
// New pets also get name / type / age and "Save this pet to my profile".
// House-entry and additional tasks belong to the home, so they're shared by every pet.
// onPetChange / onSharedChange: called with only the fields that changed
/**
 * Renders the care-details form for one pet and shared home instructions.
 * @param {Object} props - Pet data, shared details, and update callbacks.
 * @param {Object} props.pet - The pet and its current care details.
 * @param {string|null} props.houseEntry - Shared home-access instructions.
 * @param {string} props.additionalTasks - Shared additional care tasks.
 * @param {Function} props.onPetChange - Called with a pet field update.
 * @param {Function} props.onSharedChange - Called with a shared details update.
 * @returns {JSX.Element} The pet care-details form.
 */
function PetCareForm({ pet, houseEntry, additionalTasks, onPetChange, onSharedChange }) {
  // Props for a field that edits one of the pet's own details
  function petField(name) {
    return {
      id: `pet-${pet.id}-${name}`,
      value: pet[name],
      onChange: (event) => onPetChange({ [name]: event.target.value }),
    };
  }

  return (
    <div className="pet-care-form">
      {pet.isNew && (
        <div className="pet-care-form-basics">
          <TextField label="Pet name" placeholder="e.g. Mochi" {...petField("name")} />
          <TextField label="Type & breed" placeholder="e.g. Dog — Shiba Inu" {...petField("breed")} />
          <TextField label="Age" placeholder="e.g. 4 years" {...petField("age")} />
        </div>
      )}

      <TextAreaField
        label="Medication Information"
        placeholder="List any medications, dosages, and schedules here..."
        {...petField("medication")}
      />
      <TextAreaField label="Diet & Feeding Instructions" placeholder="How much food, and when?" {...petField("diet")} />
      <TextAreaField
        label="Allergy Information"
        placeholder="List any allergies or food sensitivities..."
        {...petField("allergies")}
      />
      <TextAreaField
        id="booking-house-entry"
        label="House-Entry / Lockbox Details"
        placeholder="Provide details on key location, alarm codes, or security notes..."
        hint={SHARED_HINT}
        value={houseEntry}
        onChange={(event) => onSharedChange({ houseEntry: event.target.value })}
      />
      <TextAreaField
        label="Additional Pet-Care Instructions"
        placeholder="Any special quirks, fears, or details Angelena should know..."
        {...petField("careInstructions")}
      />
      <TextField
        id="booking-additional-tasks"
        label="Additional Tasks"
        placeholder="e.g. Bring in mail, water plants..."
        hint={SHARED_HINT}
        value={additionalTasks}
        onChange={(event) => onSharedChange({ additionalTasks: event.target.value })}
      />

      {pet.isNew && (
        <Checkbox
          id={`pet-${pet.id}-save`}
          label="Save this pet to my profile for next time"
          checked={pet.saveToProfile}
          onChange={(event) => onPetChange({ saveToProfile: event.target.checked })}
        />
      )}
    </div>
  );
}

export default PetCareForm;
