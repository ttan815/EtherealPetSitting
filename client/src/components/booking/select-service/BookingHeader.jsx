// Renders the booking header component.
import BookingSteps from "./BookingSteps";
import { BOOKING_STEPS } from "../../../constants/booking-steps";
import { BOOKING_HEADER_TOPO_LINES } from "../../../constants/booking-ui";
import "../../../styles/booking/BookingHeader.css";

// Brown title band at the top of every booking step (Figma "Title Band").
// currentStep: 1-based step number, shown as "Step 1 of 4" and in the step tracker
/**
 * Renders the heading and description for a booking step.
 * @param {Object} props - Step identity and heading content.
 * @param {number} props.currentStep - The current step number.
 * @param {string} props.title - The step heading.
 * @param {string} props.description - Supporting step description.
 * @returns {JSX.Element} The booking-step heading.
 */
function BookingHeader({ currentStep, title, description }) {
  return (
    <header className="booking-header">
      <div className="booking-header-topo" aria-hidden="true">
        {BOOKING_HEADER_TOPO_LINES.map((line, index) => (
          <img key={line} className={`booking-header-topo-line booking-header-topo-line-${index + 1}`} src={line} alt="" />
        ))}
      </div>

      <div className="booking-header-inner">
        <div className="booking-header-text">
          <p className="booking-header-step">
            Step {currentStep} of {BOOKING_STEPS.length}
          </p>
          <h1 className="booking-header-title">{title}</h1>
          <p className="booking-header-description">{description}</p>
        </div>

        <BookingSteps currentStep={currentStep} />
      </div>
    </header>
  );
}

export default BookingHeader;
