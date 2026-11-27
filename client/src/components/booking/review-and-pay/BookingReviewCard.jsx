import { formatWeekdayDate, fromDateKey } from "../../../utils/calendar-dates";
import { formatTime } from "../../../utils/format-time";
import { formatServicePrice } from "../../../utils/format-service-price";
import { getSavedHouseEntry } from "../../../services/customer-dashboard/pet-service";
import { getBookingSitters } from "../../../services/booking/booking-service";

/**
 * Renders booking details and care instructions for one pet.
 * @param {{booking: Object, services: Array<Object>, pet: Object}} props - Booking, selected services, and one pet.
 * @returns {JSX.Element} The booking review card.
 */
function BookingReviewCard({ booking, services, pet, onDelete }) {
  const date = booking.dateKey ? formatWeekdayDate(fromDateKey(booking.dateKey)) : "Not selected";
  const time = booking.time === null ? "Not selected" : formatTime(booking.time);
  const sharedHouseEntry = booking.houseEntry ?? getSavedHouseEntry();
  const sitter = getBookingSitters().find((option) => option.id === booking.sitterId);

  return (
    <div className="infoContainer">
      {onDelete && (
        <button
          type="button"
          className="booking-summary-delete"
          aria-label={`Delete ${services[0]?.name ?? "service"} appointment for ${pet.name || "New pet"}`}
          onClick={onDelete}
        >
          Delete
        </button>
      )}
      <p className="title-info">Booking Summary: {pet.name || "New pet"}</p>
      <div className="flex-info">
        <p>{services.length === 1 ? "Service" : "Services"}</p>
        <p className="flex-desc">
          {services.map((service) => `${service.name} (${formatServicePrice(service)})`).join(", ")}
        </p>
      </div>
      <div className="flex-info">
        <p>Pet</p>
        <p className="flex-desc">{pet.name || "New pet"} ({pet.breed || "Type not specified"})</p>
      </div>
      <div className="flex-info">
        <p>Sitter</p>
        <p className="flex-desc">{sitter?.name ?? "No preference"}</p>
      </div>
      <div className="flex-info">
        <p>Date &amp; Time</p>
        <p className="flex-desc">{date} @ {time}</p>
      </div>
      <div className="line-overlay"></div>
      <div>
        <p className="flex-info-spec">SPECIAL INSTRUCTIONS SUMMARY</p>
        <p className="flex-info-spec">
          {[pet.diet, pet.medication, pet.allergies, pet.medicalConditions, pet.careInstructions].filter(Boolean).join(" ") ||
            "No pet-care details provided."}
        </p>
        <p className="flex-info-spec">Home entry: {sharedHouseEntry || "No home-entry instructions provided."}</p>
        {booking.additionalTasks && <p className="flex-info-spec">Additional tasks: {booking.additionalTasks}</p>}
      </div>
    </div>
  );
}

export default BookingReviewCard;
