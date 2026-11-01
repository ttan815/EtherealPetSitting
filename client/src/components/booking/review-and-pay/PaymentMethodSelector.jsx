/**
 * Renders payment-method choices and deposit disclosures.
 * @param {{paymentMethod: string, onChange: (paymentMethod: string) => void}} props - Payment selection and update callback.
 * @returns {JSX.Element} The payment-method selection card.
 */
function PaymentMethodSelector({ paymentMethod, onChange }) {
  return (
    <div className="infoContainer">
      <p className="title-info-payment">Select Payment Method</p>
      <div className="payment-methods">
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(event) => onChange(event.target.value)}
          />
          Credit / Debit Card
        </label>
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="applePay"
            checked={paymentMethod === "applePay"}
            onChange={(event) => onChange(event.target.value)}
          />
          Apple Pay
        </label>
      </div>
      <div>
        <p className="flex-desc-disclaimer">* A deposit is required to secure and confirm your appointment</p>
        <p className="flex-desc-disclaimer">* Credit or debit card details will not be stored on our servers.</p>
      </div>
    </div>
  );
}

export default PaymentMethodSelector;
