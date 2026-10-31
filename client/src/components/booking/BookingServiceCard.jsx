// Renders the booking service card component.
import arrowIcon from "../../assets/booking/arrow-select.svg";
import { formatServicePrice } from "../../utils/format-service-price";
import "../../styles/booking/BookingServiceCard.css";

// Selectable service card on step 1 of booking (Figma "Service / ...").
// The whole card is one toggle button: clicking picks it, clicking again un-picks it.
// aria-pressed tells screen readers whether it is picked.
/**
 * Renders a selectable service card in the booking flow.
 * @param {Object} props - Service data, selection state, and toggle callback.
 * @param {Object} props.service - The service details displayed on the card.
 * @param {boolean} props.isSelected - Whether the service is currently selected.
 * @param {Function} props.onToggle - Called with the service ID when toggled.
 * @returns {JSX.Element} The selectable service card.
 */
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
