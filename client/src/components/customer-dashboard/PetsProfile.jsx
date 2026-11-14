
import "../../../src/styles/customer-dashboard/PetsProfile.css";
function PetsProfile() {
    return (
        <div className="petsProfileContainer">
            <div className="petsProfileHeader">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <ellipse cx="5" cy="9" rx="2.5" ry="3" />
                    <ellipse cx="10" cy="5" rx="2.5" ry="3" />
                    <ellipse cx="16" cy="5" rx="2.5" ry="3" />
                    <ellipse cx="20" cy="10" rx="2.5" ry="3" />
                    <path d="M12 11c-3 0-7 4-7 7s3 4 7 2c4 2 7 1 7-2s-4-7-7-7z" />
                </svg>

                <h3>Pets (1)</h3>
            </div>

            <div className="petProfileOverview">
                <div className="petProfileAvatar">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <ellipse cx="5" cy="9" rx="2.5" ry="3" />
                        <ellipse cx="10" cy="5" rx="2.5" ry="3" />
                        <ellipse cx="16" cy="5" rx="2.5" ry="3" />
                        <ellipse cx="20" cy="10" rx="2.5" ry="3" />
                        <path d="M12 11c-3 0-7 4-7 7s3 4 7 2c4 2 7 1 7-2s-4-7-7-7z" />
                    </svg>
                </div>

                <div className="petProfileDetails">
                    <h2>Mochi</h2>

                    <p className="petProfileDescription">
                        Shiba Inu · 4 years old · 24 lb
                    </p>

                    <div className="petAllergyBadge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 3 22 21H2L12 3Z" />
                            <path d="M12 9v5" />
                            <circle cx="12" cy="17" r=".7" />
                        </svg>

                        Allergic to chicken
                    </div>
                </div>
            </div>

            <div className="petInformationGrid">
                <div className="petInformationCard">
                    <div className="petInformationIcon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 5a5 5 0 0 1 7 7l-4 4a5 5 0 0 1-7-7z" />
                            <path d="m8 8 7 7" />
                        </svg>
                    </div>

                    <div className="petInformationText">
                        <h5>Medications</h5>
                        <p>
                            Allergy tablet — 1 daily at 1:00 PM,
                            given with food.
                        </p>
                    </div>
                </div>

                <div className="petInformationCard">
                    <div className="petInformationIcon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M3 11h18c0 6-4 9-9 9s-9-3-9-9Z" />
                            <path d="M8 7V5M12 7V3M16 7V5" />
                        </svg>
                    </div>

                    <div className="petInformationText">
                        <h5>Diet</h5>
                        <p>
                            1 cup dry food twice a day (8 AM and 6 PM).
                            No table scraps.
                        </p>
                    </div>
                </div>

                <div className="petInformationCard">
                    <div className="petInformationIcon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                            <path d="M12 3 22 21H2L12 3Z" />
                            <path d="M12 9v5" />
                            <circle cx="12" cy="17" r=".7" />
                        </svg>
                    </div>

                    <div className="petInformationText">
                        <h5>Allergies</h5>
                        <p>
                            Chicken — check all treats and food labels.
                        </p>
                    </div>
                </div>

                <div className="petInformationCard">
                    <div className="petInformationIcon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                            <path d="M20.8 8.6c0 4.4-8.8 9.4-8.8 9.4S3.2 13 3.2 8.6a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z" />
                        </svg>
                    </div>

                    <div className="petInformationText">
                        <h5>Care notes</h5>
                        <p>
                            Nervous around loud noises. Loves the red
                            ball and belly rubs.
                        </p>
                    </div>
                </div>

                <div className="petInformationCard petVetCard">
                    <div className="petInformationIcon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <path d="M12 7v10M7 12h10" />
                        </svg>
                    </div>

                    <div className="petInformationText">
                        <h5>Vet</h5>
                        <p>
                            Maple Street Animal Hospital · (510) 555-0199
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetsProfile;
