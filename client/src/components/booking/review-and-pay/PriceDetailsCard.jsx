import { getBookingPrice, formatBookingAmount } from "../../../utils/booking-pricing";

/**
 * Renders the service cost, deposit, and remaining-balance breakdown.
 * @param {{services: Array<Object>, dateKey: string|null}} props - Selected services and appointment date.
 * @returns {JSX.Element} The price-details and deposit cards.
 */
function PriceDetailsCard({ services, dateKey }) {
  const { total, deposit, balance } = getBookingPrice(services, dateKey);
  const depositWindow = deposit === 20 ? "within 30 days" : deposit === 50 ? "within 60 days" : "within 90 days";

  return (
    <>
      <div className="infoContainer">
        <p className="title-info">Price Details</p>
        <div className="flex-info">
          <p>Service Fee</p>
          <p className="flex-desc">{formatBookingAmount(total)}</p>
        </div>
        <div className="flex-info">
          <p>Required Deposit</p>
          <p className="flex-desc">{formatBookingAmount(deposit)}</p>
        </div>
        <div className="flex-info">
          <p>Remaining Balance (Due after visit)</p>
          <p className="flex-desc">{formatBookingAmount(balance)}</p>
        </div>
      </div>
      <div className="infoContainer-deposit">
        <div className="flex-info">
          <p>Your deposit today</p>
          <p className="flex-desc-deposit">{formatBookingAmount(deposit)}</p>
        </div>
        <div>
          <p className="flex-info-spec-deposit">
            {dateKey
              ? `You're booking ${depositWindow}, so your deposit is ${formatBookingAmount(deposit)}. The remaining balance is due after the visit, in cash or online.`
              : "Select an appointment date to calculate the required deposit."}
          </p>
        </div>
      </div>
    </>
  );
}

export default PriceDetailsCard;
