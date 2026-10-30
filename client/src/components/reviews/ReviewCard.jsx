// dt279 customer comment component
// shows one review: the reviewer initials, pet name, stars, date, and the comment

// shared star row
import StarRating from "./StarRating";
// styles for this card
import "../../styles/reviews/ReviewCard.css";

// review holds the info for one review
function ReviewCard({ review }) {
  // what the card looks like
  return (
    <article className="review-card">
      {/* round circle with the reviewer initials, hidden from screen readers since the name is shown */}
      <span className="review-card-avatar" aria-hidden="true">{review.initials}</span>

      {/* everything to the right of the circle */}
      <div className="review-card-body">
        {/* pet name */}
        <h3 className="review-card-name">{review.petName}</h3>

        {/* stars and date on one line */}
        <div className="review-card-meta">
          <StarRating rating={review.rating} size={18} />
          <span className="review-card-date">{review.date}</span>
        </div>

        {/* the comment */}
        <p className="review-card-text">{review.comment}</p>
      </div>

      {/* three dots menu, it will hold options like report later */}
      <button type="button" className="review-card-menu" aria-label="More options">
        ⋯
      </button>
    </article>
  );
}

export default ReviewCard;
