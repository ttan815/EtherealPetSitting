import pawIcon from "../../assets/booking/pet-paw.svg";
import doneIcon from "../../assets/booking/pet-done.svg";
import doneLightIcon from "../../assets/booking/pet-done-light.svg";
import "../../styles/booking/PetSelector.css";

// "Select a Pet(s)" row on booking step 3 (Figma "Pet Tabs").
// pets: pets in this booking; clicking one shows its form, "×" takes it out of the booking
// completedPetIds: pets whose details are filled in (they get a check)
// addablePets: saved pets that were taken out; shown as dashed "+ Name" chips to add back
function PetSelector({ pets, activePetId, completedPetIds, addablePets, onSwitch, onRemove, onAdd, onAddNew }) {
  const canRemove = pets.length > 1; // a booking needs at least one pet

  return (
    <div className="pet-selector">
      <div className="pet-selector-label">
        <h2 id="pet-selector-title" className="pet-selector-title">
          Select a Pet(s)
        </h2>
        <span className="pet-selector-count">{pets.length} selected</span>
      </div>

      <div className="pet-selector-chips" role="group" aria-labelledby="pet-selector-title">
        {pets.map((pet) => {
          const isActive = pet.id === activePetId;
          const isComplete = completedPetIds.includes(pet.id);
          const name = pet.name.trim() || "New pet";
          const subtitle = pet.breed.trim() || "Not filled in yet";

          return (
            <div key={pet.id} className={`pet-chip ${isActive ? "is-active" : ""}`.trim()}>
              <button type="button" className="pet-chip-main" aria-pressed={isActive} onClick={() => onSwitch(pet.id)}>
                <span className="pet-chip-photo" aria-hidden="true">
                  <img src={pawIcon} alt="" />
                </span>
                <span className="pet-chip-text">
                  <span className="pet-chip-name">{name}</span>
                  <span className="pet-chip-subtitle">{subtitle}</span>
                </span>
                {isComplete && <img className="pet-chip-done" src={isActive ? doneLightIcon : doneIcon} alt="(details done)" />}
              </button>
              {canRemove && (
                <button
                  type="button"
                  className="pet-chip-remove"
                  aria-label={`Remove ${name} from this booking`}
                  onClick={() => onRemove(pet.id)}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {addablePets.map((pet) => (
          <button key={pet.id} type="button" className="pet-chip-add" onClick={() => onAdd(pet)}>
            + {pet.name}
          </button>
        ))}
        <button type="button" className="pet-chip-add" onClick={onAddNew}>
          + New pet
        </button>
      </div>

      <p className="pet-selector-hint">Fill in the details for each pet. Click a pet to switch.</p>
    </div>
  );
}

export default PetSelector;
