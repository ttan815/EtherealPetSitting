// Renders the selected service banner component.
import { formatServicePrice } from "../../utils/format-service-price";
import pawIcon from "../../assets/booking/icon-paw.svg";
import "../../styles/booking/SelectedServiceBanner.css";

// Reminds the customer which services they picked on step 1.
// One service: its icon, name, description and price (Figma).
// Several services: a paw icon, all the names, and each price.
/**
 * Renders the selected services in the booking-step banner.
 * @param {Object} props - Selected service data.
 * @param {Array<Object>} props.services - Services to show in the banner.
 * @returns {JSX.Element} The selected-service banner.
 */
function SelectedServiceBanner({ services }) {
  const isSingleService = services.length === 1;
  const names = services.map((service) => service.name).join(", ");
  const prices = services.map((service) => `${service.name} ${formatServicePrice(service)}`).join(" · ");

  return (
    <div className="selected-service-banner">
      <span className="selected-service-banner-icon" aria-hidden="true">
        <img src={isSingleService ? services[0].icon : pawIcon} alt="" />
      </span>
      <div className="selected-service-banner-text">
        <p className="selected-service-banner-name">
          {isSingleService ? "Selected Service" : "Selected Services"}: {names}
        </p>
        <p className="selected-service-banner-details">
          {isSingleService
            ? `${services[0].description} Price: ${formatServicePrice(services[0])}.`
            : `Prices: ${prices}.`}
        </p>
      </div>
    </div>
  );
}

export default SelectedServiceBanner;
