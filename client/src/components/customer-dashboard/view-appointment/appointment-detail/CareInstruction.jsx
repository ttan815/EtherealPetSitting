// Renders the care instruction component.
import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

/**
 * Renders the care instructions for the specified pet.
 * @param {Object} props - Appointment care instructions.
 * @param {Object} props.careInstructions - Care details supplied with the appointment.
 * @returns {JSX.Element} The pet care-instructions section.
 */
function CareInstruction({ careInstructions }) {
    return (
        <div className="card-care-instructions">
            <div className="care-instructions-provided">Care Instructions Provided</div>
            <div className="instruction-blocks">
            <div className="instruction-box-row">
                <div className="medication-information">Medication Information</div>
                <div className="none-required-for-this-visit">{careInstructions.medication}</div>
            </div>
            <div className="instruction-box-row">
                <div className="diet-feeding-instructions">
                Diet &amp; Feeding Instructions
                </div>
                <div className="feed-1-2-cup-kibble-at-12-00-pm-clean-water-bowl-thoroughly-and-fill-to-the-brim">
                    {careInstructions.diet}
                </div>
            </div>
            <div className="instruction-box-row">
                <div className="allergy-details">Allergy Details</div>
                <div className="slightly-sensitive-to-wheat-grains-please-only-offer-ethereal-salmon-treats">
                    {careInstructions.allergies}
                </div>
            </div>
            <div className="instruction-box-row">
                <div className="house-entry-lockbox">House Entry &amp; Lockbox</div>
                <div className="code-is-4821-key-is-in-the-lockbox-by-back-door-code-0917-lock-deadbolt-upon-leaving">
                    {careInstructions.houseEntry}
                </div>
            </div>
            </div>
            <div className="tasks-block">
            <div className="additional-requested-tasks">
                Additional Requested Tasks
            </div>
            {careInstructions.additionalTasks.map((task) => (
                <div className="task-item" key={task}>
                    <div className="water-the-plants-on-the-back-patio">+ {task}</div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default CareInstruction;