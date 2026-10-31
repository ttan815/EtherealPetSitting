// Renders the booking steps component.
import { BOOKING_STEPS } from "../../constants/booking-steps";
import stepDoneIcon from "../../assets/booking/step-done.svg";
import "../../styles/booking/BookingSteps.css";

// Numbered step tracker for the booking flow (Figma "BookingSteps").
// currentStep: 1-based; that step gets the filled circle and earlier steps get an arrow
/**
 * Renders the booking progress indicator for the current step.
 * @param {Object} props - Current booking step.
 * @param {number} props.currentStep - The active step number.
 * @returns {JSX.Element} The booking progress indicator.
 */
function BookingSteps({ currentStep }) {
  return (
    <ol className="booking-steps" aria-label="Booking progress">
      {BOOKING_STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isCurrent = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;

        return (
          <li
            key={label}
            className={`booking-step ${isCurrent ? "is-current" : ""}`.trim()}
            aria-current={isCurrent ? "step" : undefined}
          >
            {isComplete ? (
              <img className="booking-step-done" src={stepDoneIcon} alt="Completed:" />
            ) : (
              <span className="booking-step-number">{stepNumber}</span>
            )}
            <span className="booking-step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default BookingSteps;
