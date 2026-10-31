// dt278 overall rating component
// shows the average rating, stars, how many reviews, a bar for each star level,
// and the write a review button

// shared star row
import StarRating from "./StarRating";
// team button
import Button from "../form/Button";
// styles for this section
import "../../styles/reviews/OverallRating.css";

// reviews is the list of reviews, on write review opens the popup
/**
 * Renders the aggregate review rating and the write-review action.
 * @param {Object} props - Review records and review-submission callback.
 * @param {Array<Object>} props.reviews - Reviews used to calculate the overall rating.
 * @param {Function} props.onWriteReview - Called to open the review form.
 * @returns {JSX.Element} The overall rating summary.
 */
function OverallRating({ reviews, onWriteReview }) {
  // how many reviews there are
  const total = reviews.length;

  // add up all the stars and divide to get the average, or 0 when there are no reviews
  const average = total === 0 ? 0 : reviews.reduce((sum, review) => sum + review.rating, 0) / total;

  // count how many reviews have 5 stars, 4 stars, and so on
  const levels = [5, 4, 3, 2, 1].map((stars) => ({
    stars, // which star level this row is for
    count: reviews.filter((review) => review.rating === stars).length, // how many reviews gave this many stars
  }));

  // what the section looks like
  return (
    <section className="overall-rating" aria-label="Overall rating">
      {/* left side with the big number */}
      <div className="overall-rating-summary">
        <h2 className="overall-rating-title">Overall Rating</h2>
        {/* average with one decimal, for example 4.0 */}
        <p className="overall-rating-score">{average.toFixed(1)}</p>
        <StarRating rating={average} size={34} />
        {/* how many reviews */}
        <p className="overall-rating-count">{total} {total === 1 ? "Review" : "Reviews"}</p>
      </div>

      {/* right side with the bars */}
      <div className="overall-rating-bars">
        {/* one row for each star level */}
        {levels.map((level) => (
          <div key={level.stars} className="overall-rating-row">
            <span className="overall-rating-label">{level.stars} {level.stars === 1 ? "Star" : "Stars"}</span>
            {/* the bar, filled based on how many reviews gave this level */}
            <div
              className="overall-rating-bar"
              role="img"
              aria-label={`${level.count} reviews with ${level.stars} stars`}
            >
              <div
                className="overall-rating-bar-fill"
                style={{ width: total === 0 ? "0%" : `${(level.count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}

        {/* opens the write a review popup */}
        <Button variant="outline" type="button" className="overall-rating-write" onClick={onWriteReview}>
          Write a Review
        </Button>
      </div>
    </section>
  );
}

export default OverallRating;
