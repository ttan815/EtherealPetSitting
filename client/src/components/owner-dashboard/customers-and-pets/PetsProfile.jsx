import { useState } from "react";
import Button from "../../form/Button";
import "../../../styles/customer-dashboard/PetsProfile.css";
function PawIcon({ size = 26 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <ellipse cx="5" cy="9" rx="2.5" ry="3" />
            <ellipse cx="10" cy="5" rx="2.5" ry="3" />
            <ellipse cx="16" cy="5" rx="2.5" ry="3" />
            <ellipse cx="20" cy="10" rx="2.5" ry="3" />
            <path d="M12 11c-3 0-7 4-7 7s3 4 7 2c4 2 7 1 7-2s-4-7-7-7z" />
        </svg>
    );
}

function InfoTile({ title, text, className = "" }) {
    return (
        <div className={`petInformationCard ${className}`}>
            <div className="petInformationIcon" aria-hidden="true">
                <PawIcon size={14} />
            </div>
            <div className="petInformationText">
                <h5>{title}</h5>
                <p>{text || "Not provided."}</p>
            </div>
        </div>
    );
}

/**
 * Renders the selected customer's pets and their care information.
 * @param {{pets: Object[], onSavePetCareNotes?: Function}} "props" Pet records and optional save handler.
 * @returns {JSX.Element} The pet profile section.
 */
function PetsProfile({ pets, onSavePetCareNotes }) {
    const [editingPetId, setEditingPetId] = useState(null);
    const editingPet = pets.find((pet) => pet.id === editingPetId);
    if (editingPet && onSavePetCareNotes) {
        return (
            <PetCareNotesEditor
                key={editingPet.id}
                pet={editingPet}
                onSave={onSavePetCareNotes}
                onCancel={() => setEditingPetId(null)}
            />
        );
    }
    return (
        <div className="petsProfileContainer">
            <div className="petsProfileHeader">
                <PawIcon size={16} />
                <h3>Pets ({pets.length})</h3>
            </div>
            {pets.map((pet) => (
                <article className="petProfileCard" key={pet.id}>
                    <div className="petProfileOverview">
                        <div className="petProfileAvatar" aria-hidden="true">
                            <PawIcon />
                        </div>
                        <div className="petProfileDetails">
                            <h2>{pet.name}</h2>

                            <p className="petProfileDescription">
                                {pet.breed} · {pet.age} · {pet.weight}
                            </p>
                            <div className="petAllergyBadge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                    <path d="M12 3 22 21H2L12 3Z" />
                                    <path d="M12 9v5" />
                                    <circle cx="12" cy="17" r=".7" />
                                </svg>
                                Allergies: {pet.allergies || "None known"}
                            </div>
                        </div>
                    </div>
                    <div className="petInformationGrid">
                        <InfoTile title="Medications" text={pet.medications} />
                        <InfoTile title="Diet" text={pet.diet} />
                        <InfoTile title="Allergies" text={pet.allergies || "None known"} />
                        <InfoTile title="Medical conditions" text={pet.medicalConditions || "None provided"} />
                        <InfoTile title="Care notes" text={pet.careNotes} />
                        <InfoTile
                            title="Vet"
                            text={`${pet.vetName}${pet.vetPhone ? ` · ${pet.vetPhone}` : ""}`}
                            className="petVetCard"
                        />
                    </div>
                    <div className="editCareNotesContainer">
                        {onSavePetCareNotes && (
                            <Button type="button" onClick={() => setEditingPetId(pet.id)}>
                                Edit care notes
                            </Button>
                        )}
                    </div>
                </article>
            ))}
            {pets.length === 0 && <p className="petsProfileEmpty">No pets listed for this customer.</p>}
        </div>
    );
}
function PetCareNotesEditor({ pet, onSave, onCancel }) {
    const [medications, setMedications] = useState(pet.medications ?? "");
    const [diet, setDiet] = useState(pet.diet ?? "");
    const [careNotes, setCareNotes] = useState(pet.careNotes ?? "");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const saved = onSave(pet.id, { medications, diet, careNotes });

        if (saved) {
            onCancel();
        } else {
            setError("Could not save the changes. Please try again.");
        }
    }

    return (
        <form className="petCareEditor" onSubmit={handleSubmit}>
            <h2>Edit {pet.name}’s care notes</h2>

            <label className="petCareField">
                Medication
                <input
                    value={medications}
                    onChange={(event) => setMedications(event.target.value)}
                />
            </label>

            <label className="petCareField">
                Diet
                <input
                    value={diet}
                    onChange={(event) => setDiet(event.target.value)}
                />
            </label>

            <label className="petCareField">
                Pet care instruction
                <textarea
                    rows={4}
                    value={careNotes}
                    onChange={(event) => setCareNotes(event.target.value)}
                />
            </label>

            {error && <p role="alert">{error}</p>}

            <div className="petCareEditorActions">
                <Button type="button" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    );
}
/**
 * Exports the PetsProfile component.
 * @returns {Function} The pet profile component.
 */
export default PetsProfile;
