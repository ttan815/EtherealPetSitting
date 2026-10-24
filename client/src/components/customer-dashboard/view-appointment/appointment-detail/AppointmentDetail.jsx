import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import Header from "./Header";
import ServiceSchedule from "./ServiceSchedule";
import CareInstruction from "./CareInstruction";

function AppointmentDetail() {
    return (
        <div className="page-content">
            <Header/>
            <div className="content-split-columns">
                <div className="left-segment-details">
                    <ServiceSchedule/>
                    <CareInstruction/>
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