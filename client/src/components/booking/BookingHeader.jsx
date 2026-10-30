import BookingSteps from "./BookingSteps";
import { BOOKING_STEPS } from "../../constants/booking-steps";
import topo1 from "../../assets/booking/title-topo-1.svg";
import topo2 from "../../assets/booking/title-topo-2.svg";
import topo3 from "../../assets/booking/title-topo-3.svg";
import topo4 from "../../assets/booking/title-topo-4.svg";
import topo5 from "../../assets/booking/title-topo-5.svg";
import topo6 from "../../assets/booking/title-topo-6.svg";
import "../../styles/BookingHeader.css";

const TOPO_LINES = [topo1, topo2, topo3, topo4, topo5, topo6];

// Brown title band at the top of every booking step (Figma "Title Band").
// currentStep: 1-based step number, shown as "Step 1 of 4" and in the step tracker
function BookingHeader({ currentStep, title, description }) {
  return (
    <header className="booking-header">
      <div className="booking-header-topo" aria-hidden="true">
        {TOPO_LINES.map((line, index) => (
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
