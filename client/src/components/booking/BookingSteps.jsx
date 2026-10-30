import { BOOKING_STEPS } from "../../constants/booking-steps";
import "../../styles/BookingSteps.css";

// Numbered step tracker for the booking flow (Figma "BookingSteps").
// currentStep: 1-based; that step gets the filled circle
function BookingSteps({ currentStep }) {
  return (
    <ol className="booking-steps" aria-label="Booking progress">
      {BOOKING_STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isCurrent = stepNumber === currentStep;

        return (
          <li
            key={label}
            className={`booking-step ${isCurrent ? "is-current" : ""}`.trim()}
            aria-current={isCurrent ? "step" : undefined}
          >
            <span className="booking-step-number">{stepNumber}</span>
            <span className="booking-step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default BookingSteps;
