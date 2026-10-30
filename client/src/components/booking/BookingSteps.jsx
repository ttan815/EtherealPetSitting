import { BOOKING_STEPS } from "../../constants/booking-steps";
import stepDoneIcon from "../../assets/booking/step-done.svg";
import "../../styles/BookingSteps.css";

// Numbered step tracker for the booking flow (Figma "BookingSteps").
// currentStep: 1-based; that step gets the filled circle and earlier steps get an arrow
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
