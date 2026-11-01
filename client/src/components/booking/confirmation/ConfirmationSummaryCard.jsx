import { formatWeekdayDate, fromDateKey } from "../../../utils/calendar-dates";
import { formatTime } from "../../../utils/format-time";
import { formatServicePrice } from "../../../utils/format-service-price";
import { getBookingPrice, formatBookingAmount } from "../../../utils/booking-pricing";
import { getSavedPets } from "../../../utils/placeholder-pets";

/**
 * Renders the confirmed appointment and payment summary.
 * @param {{booking: Object, services: Array<Object>}} props - Confirmed booking data.
 * @returns {JSX.Element} The booking summary card.
 */
function ConfirmationSummaryCard({ booking, services }) {
  const pets = booking.pets ?? getSavedPets();
  const { deposit, balance } = getBookingPrice(services, booking.dateKey);

  return (
    <div className="confirmation-summary-card">
      <h2 className="confirmation-summary-title">Booking Summary</h2>
      <div className="confirmation-summary-row">
        <p>Confirmation Number</p>
        <p className="confirmation-summary-value confirmation-number">EBP-2026-0847</p>
      </div>
      <div className="confirmation-summary-row">
        <p>Service Type</p>
        <p className="confirmation-summary-value">
          {services.map((service) => `${service.name} (${formatServicePrice(service)})`).join(", ")}
        </p>
      </div>
      <div className="confirmation-summary-row">
        <p>Pet Name</p>
        <p className="confirmation-summary-value">{pets.map((pet) => `${pet.name} (${pet.breed})`).join(", ")}</p>
      </div>
      <div className="confirmation-summary-row">
        <p>Date</p>
        <p className="confirmation-summary-value">
          {booking.dateKey ? formatWeekdayDate(fromDateKey(booking.dateKey)) : "Not selected"}
        </p>
      </div>
      <div className="confirmation-summary-row">
        <p>Time Slot</p>
        <p className="confirmation-summary-value">{booking.time === null ? "Not selected" : formatTime(booking.time)}</p>
      </div>
      <div className="confirmation-divider"></div>
      <div>
        <div className="confirmation-summary-row">
          <p>Deposit Paid</p>
          <p className="confirmation-summary-value">{formatBookingAmount(deposit)}</p>
        </div>
        <div className="confirmation-summary-row">
          <p>Remaining Balance</p>
          <p className="confirmation-summary-value">{formatBookingAmount(balance)}</p>
        </div>
        <div className="confirmation-divider"></div>
        <div className="confirmation-calendar-note">
          <span className="confirmation-checkbox"></span>
          <span className="confirmation-calendar-note-text">
            This appointment has been added to the business calendar.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationSummaryCard;
