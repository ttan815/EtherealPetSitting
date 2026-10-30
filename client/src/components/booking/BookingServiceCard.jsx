import arrowIcon from "../../assets/booking/arrow-select.svg";
import { formatServicePrice } from "../../utils/format-service-price";
import "../../styles/BookingServiceCard.css";

// Selectable service card on step 1 of booking (Figma "Service / ...").
// The whole card is one toggle button: clicking picks it, clicking again un-picks it.
// aria-pressed tells screen readers whether it is picked.
function BookingServiceCard({ service, isSelected, onToggle }) {
  return (
    <button
      type="button"
      className={`booking-service-card ${isSelected ? "is-selected" : ""}`.trim()}
      aria-pressed={isSelected}
      onClick={() => onToggle(service.id)}
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
          From {formatServicePrice(service)}
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
