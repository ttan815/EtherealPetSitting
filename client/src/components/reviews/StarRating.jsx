// shared star row used by the review card, the rating summary, and the write a review popup
// rating is how many stars are filled, max is how many stars to show

// bring in the star styles
import "../../styles/reviews/StarRating.css";

// shows stars that can only be looked at, or picked when on select is given
/**
 * Renders a star rating, optionally allowing the user to select a rating.
 * @param {Object} props - Rating value, appearance, and optional selection behavior.
 * @param {number} [props.rating] - Current rating value.
 * @param {number} [props.max] - Number of stars in the scale.
 * @param {number} [props.size] - Star icon size in pixels.
 * @param {Function} [props.onSelect] - Called with the selected rating when interactive.
 * @param {string} [props.label] - Accessible label for the rating.
 * @returns {JSX.Element} The star rating control or display.
 */
function StarRating({ rating = 0, max = 5, size = 20, onSelect, label }) {
  // make a list like 1, 2, 3, 4, 5 so we can draw one star for each number
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  // when there is no click handler the stars are just for display
  if (!onSelect) {
    return (
      <span
        className="star-rating"
        style={{ fontSize: size }}
        role="img"
        aria-label={label || `${rating} out of ${max} stars`}
      >
        {/* draw each star filled or empty */}
        {stars.map((star) => (
          <span key={star} className={star <= Math.round(rating) ? "star star-filled" : "star"} aria-hidden="true">
            ★
          </span>
        ))}
      </span>
    );
  }

  // clickable stars for picking a rating
  return (
    <div className="star-rating star-rating-pick" style={{ fontSize: size }} role="radiogroup" aria-label={label || "Star rating"}>
      {/* one button per star */}
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === rating}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          className={star <= rating ? "star star-filled" : "star"}
          onClick={() => onSelect(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRating;
