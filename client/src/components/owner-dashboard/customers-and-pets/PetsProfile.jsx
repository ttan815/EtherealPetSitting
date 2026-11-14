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
 * Renders every pet and its care information for the selected customer.
 * @param {{pets: Object[]}} props Pet records for the selected customer.
 * @returns {JSX.Element} The pet profile section.
 */
function PetsProfile({ pets }) {
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
                        <InfoTile title="Care notes" text={pet.careNotes} />
                        <InfoTile
                            title="Vet"
                            text={`${pet.vetName}${pet.vetPhone ? ` · ${pet.vetPhone}` : ""}`}
                            className="petVetCard"
                        />
                    </div>
                </article>
            ))}
            {pets.length === 0 && <p className="petsProfileEmpty">No pets listed for this customer.</p>}
        </div>
    );
}

/**
 * Exports the PetsProfile component.
 * @returns {Function} The pet profile component.
 */
export default PetsProfile;
