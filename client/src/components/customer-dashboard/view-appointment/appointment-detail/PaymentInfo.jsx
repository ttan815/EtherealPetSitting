// Renders the payment info component.
import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

/**
 * Renders payment information for the given transaction.
 * @param {Object} props - Appointment payment details.
 * @param {Object} props.payment - Payment information to display.
 * @returns {JSX.Element} The transaction payment-information section.
 */
function PaymentInfo({ payment }) {
    return (
        <div className="card-payment-info">
            <div className="payment-invoicing">Payment &amp; Invoicing</div>
            <div className="financials">
            <div className="payment-meta-line">
                <div className="service-pricing">Service Pricing</div>
                <div className="_25-00">{payment.servicePricing}</div>
            </div>
            <div className="payment-meta-line">
                <div className="required-deposit">Required Deposit</div>
                <div className="_20-00">{payment.requiredDeposit}</div>
            </div>
            <div className="payment-meta-line">
                <div className="deposit-paid-via">Deposit Paid Via</div>
                <div className="visa-ending-in-4242">{payment.depositPaidVia}</div>
            </div>
            <div className="divider-line"></div>
            <div className="due-statement">
                <div className="remaining-balance-due">Remaining Balance Due</div>
                <div className="_5-00">{payment.remainingBalance}</div>
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

export default PaymentInfo;