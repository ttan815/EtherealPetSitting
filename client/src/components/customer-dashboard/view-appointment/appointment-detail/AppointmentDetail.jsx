import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import Header from "./Header"

function AppointmentDetail() {
    return (
        <div className="page-content">
            <Header/>
            <div className="content-split-columns">
                <div className="left-segment-details">
                <div className="card-service-schedule">
                    <div className="service-schedule">Service &amp; Schedule</div>
                    <div className="schedule-detail-meta">
                    <div className="row-data-meta">
                        <div className="sitter-assigned">Sitter Assigned</div>
                        <div className="angelena-script-owner">Angelena Script (Owner)</div>
                    </div>
                    <div className="row-data-meta">
                        <div className="service-booked">Service Booked</div>
                        <div className="drop-in-care">Drop-in Care</div>
                    </div>
                    <div className="row-data-meta">
                        <div className="pet-name">Pet Name</div>
                        <div className="mochi-shiba-inu">Mochi · Shiba Inu</div>
                    </div>
                    <div className="row-data-meta">
                        <div className="date-scheduled">Date Scheduled</div>
                        <div className="tuesday-october-6-2026">Tuesday, October 6, 2026</div>
                    </div>
                    <div className="row-data-meta">
                        <div className="check-in-slot">Check-In Slot</div>
                        <div className="_12-00-pm">12:00 PM</div>
                    </div>
                    </div>
                </div>
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
                </div>
                <div className="right-segment-panel">
                <div className="card-payment-info">
                    <div className="payment-invoicing">Payment &amp; Invoicing</div>
                    <div className="financials">
                    <div className="payment-meta-line">
                        <div className="service-pricing">Service Pricing</div>
                        <div className="_25-00">$25.00</div>
                    </div>
                    <div className="payment-meta-line">
                        <div className="required-deposit">Required Deposit</div>
                        <div className="_20-00">$20.00</div>
                    </div>
                    <div className="payment-meta-line">
                        <div className="deposit-paid-via">Deposit Paid Via</div>
                        <div className="visa-ending-in-4242">Visa ending in •••• 4242</div>
                    </div>
                    <div className="divider-line"></div>
                    <div className="due-statement">
                        <div className="remaining-balance-due">Remaining Balance Due</div>
                        <div className="_5-00">$5.00</div>
                    </div>
                    </div>
                    <div className="deposit-information-warning">
                    <div
                        className="balance-is-automatically-billed-to-your-selected-card-upon-completion-of-care-service"
                    >
                        Balance is automatically billed to your selected card upon
                        completion of care service.
                    </div>
                    </div>
                </div>
                <div className="sitter-sidebar-actions">
                    <div className="button-reschedule-appointment">
                    <div className="see-all-reviews">Reschedule Appointment</div>
                    </div>
                    <div className="button-download-receipt">
                    <div className="see-all-reviews">Download Receipt</div>
                    </div>
                    <div className="button-cancel-appointment">
                    <div className="see-all-reviews">Cancel Appointment</div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
}

export default AppointmentDetail;