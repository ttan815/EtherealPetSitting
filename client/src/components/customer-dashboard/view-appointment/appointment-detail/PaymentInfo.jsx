import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

function paymentInfo( {transactionId} ) {
    return (
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
    );
}

export default paymentInfo;