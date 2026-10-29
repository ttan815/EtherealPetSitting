import arrowIcon from "../../assets/booking/arrow-select.svg";
import "../../styles/BookingServiceCard.css";

// "From $25 / visit", or "From $— / day" while the price is a placeholder
function formatStartingPrice(startingPrice, priceUnit) {
  const amount = startingPrice ?? "—";
  return `From $${amount} / ${priceUnit}`;
}

// Selectable service card on step 1 of booking (Figma "Service / ...").
// The whole card is one toggle button; aria-pressed tells screen readers it is picked.
function BookingServiceCard({ service, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`booking-service-card ${isSelected ? "is-selected" : ""}`.trim()}
      aria-pressed={isSelected}
      onClick={() => onSelect(service.id)}
    >
      <span className="booking-service-card-body">
        <span className="booking-service-card-icon" aria-hidden="true">
          <img src={service.icon} alt="" />
        </span>
        <span className="booking-service-card-name">{service.name}</span>
        <span className="booking-service-card-description">{service.description}</span>
      </span>

      <span className="booking-service-card-footer">
        <span className="booking-service-card-price">
          {formatStartingPrice(service.startingPrice, service.priceUnit)}
        </span>
        <span className="booking-service-card-action">
          Select this
          <img src={arrowIcon} alt="" />
        </span>
      </span>
    </button>
  );
}

export default BookingServiceCard;
