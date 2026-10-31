// Renders the booking summary strip component.
import { formatWeekdayDate } from "../../utils/calendar-dates";
import { formatTime } from "../../utils/format-time";
import { formatStartingAmount } from "../../utils/format-service-price";
import "../../styles/booking/BookingSummaryStrip.css";

// One-line recap of steps 1 and 2: "Service: Drop-in Care ($25) | Date & Time: Tue, Oct 6 @ 12:00 PM"
// date: Date; time: minutes after midnight
/**
 * Renders a compact summary of selected services, date, and time.
 * @param {Object} props - Current booking summary values.
 * @param {Array<Object>} props.services - Selected services to summarize.
 * @param {Date|string|null} props.date - Selected appointment date.
 * @param {string|number|null} props.time - Selected appointment start time.
 * @returns {JSX.Element} The booking summary strip.
 */
function BookingSummaryStrip({ services, date, time }) {
  const serviceList = services.map((service) => `${service.name} (${formatStartingAmount(service)})`).join(", ");

  return (
    <dl className="booking-summary-strip">
      <div className="booking-summary-strip-item">
        <dt>{services.length === 1 ? "Service:" : "Services:"}</dt>
        <dd>{serviceList}</dd>
      </div>
      <div className="booking-summary-strip-item">
        <dt>Date &amp; Time:</dt>
        <dd>
          {formatWeekdayDate(date)} @ {formatTime(time)}
        </dd>
      </div>
    </dl>
  );
}

export default BookingSummaryStrip;
