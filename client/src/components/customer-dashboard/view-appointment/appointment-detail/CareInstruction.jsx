import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

function CareInstruction() {
    return (
        <div className="card-care-instructions">
            <div className="care-instructions-provided">Care Instructions Provided</div>
            <div className="instruction-blocks">
            <div className="instruction-box-row">
                <div className="medication-information">Medication Information</div>
                <div className="none-required-for-this-visit">
                None required for this visit.
                </div>
            </div>
            <div className="instruction-box-row">
                <div className="diet-feeding-instructions">
                Diet &amp; Feeding Instructions
                </div>
                <div
                className="feed-1-2-cup-kibble-at-12-00-pm-clean-water-bowl-thoroughly-and-fill-to-the-brim"
                >
                Feed 1/2 cup kibble at 12:00 PM. Clean water bowl thoroughly and
                fill to the brim.
                </div>
            </div>
            <div className="instruction-box-row">
                <div className="allergy-details">Allergy Details</div>
                <div
                className="slightly-sensitive-to-wheat-grains-please-only-offer-ethereal-salmon-treats"
                >
                Slightly sensitive to wheat grains. Please only offer Ethereal
                Salmon treats.
                </div>
            </div>
            <div className="instruction-box-row">
                <div className="house-entry-lockbox">House Entry &amp; Lockbox</div>
                <div
                className="code-is-4821-key-is-in-the-lockbox-by-back-door-code-0917-lock-deadbolt-upon-leaving"
                >
                Code is 4821. Key is in the lockbox by back door. Code 0917. Lock
                deadbolt upon leaving.
                </div>
            </div>
            </div>
            <div className="tasks-block">
            <div className="additional-requested-tasks">
                Additional Requested Tasks
            </div>
            <div className="task-item">
                <div className="water-the-plants-on-the-back-patio">
                + Water the plants on the back patio
                </div>
            </div>

            <div className="task-item">
                <div className="bring-in-the-daily-mail-from-box">
                + Bring in the daily mail from box
                </div>
            </div>
            </div>
        </div>
    );
}

export default CareInstruction;