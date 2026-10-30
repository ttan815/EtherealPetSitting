import { formatWeekdayDate } from "../../utils/calendar-dates";
import { formatTime } from "../../utils/format-time";
import { formatStartingAmount } from "../../utils/format-service-price";
import "../../styles/BookingSummaryStrip.css";

// One-line recap of steps 1 and 2: "Service: Drop-in Care ($25) | Date & Time: Tue, Oct 6 @ 12:00 PM"
// date: Date; time: minutes after midnight
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
