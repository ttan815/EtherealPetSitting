// Renders the reviews to approve card on the owner dashboard.
import { useCallback, useState } from "react";
import ReasonPopup from "../../popup/ReasonPopup";
import Toast from "../../popup/Toast";
import rejectIcon from "../../../assets/owner-dashboard/reject-review-icon.svg";
import "../../../styles/owner-dashboard/ReviewsToApprove.css";

const DAY_MS = 24 * 60 * 60 * 1000;

// Temporary placeholder reviews waiting for approval (Figma "Admin — Dashboard").
// BACKEND: replace with the pending reviews from the API, in the same shape.
function getPendingReviews() {
  const now = Date.now();
  return [
    { id: "review-sarah", rating: 5, text: "Took such good care of our pup. Updates after every visit!", customerName: "Sarah M.", service: "Dog Walking", submittedAt: new Date(now - 2 * DAY_MS) },
    { id: "review-priya", rating: 5, text: "So organized with our cat’s medication. Highly recommend.", customerName: "Priya K.", service: "Medication", submittedAt: new Date(now - 5 * DAY_MS) },
    { id: "review-kevin", rating: 4, text: "Great with our anxious lab. Would book again.", customerName: "Kevin P.", service: "Overnight Stay", submittedAt: new Date(now - 6 * DAY_MS) },
  ];
}

// Temporary placeholder: average of the approved reviews and how many there are.
// BACKEND: replace with the rating summary from the API.
function getAverageRating() {
  return { average: 5, count: 24 };
}

// "Today", "1 day ago", "5 days ago"
function formatTimeAgo(date) {
  const days = Math.floor((Date.now() - date.getTime()) / DAY_MS);
  if (days < 1) return "Today";
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

// ★★★★☆: filled stars for the rating, faded stars for the rest
function StarRating({ rating, className }) {
  return (
    <span className={`review-stars ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "" : "review-star-empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

/**
 * Renders the reviews waiting for the owner's approval, with the approved reviews' average rating.
 * Approve shows a "Review approved" toast; Reject opens the Reject Review popup.
 * @returns {JSX.Element} The reviews to approve card.
 */
export default function ReviewsToApprove() {
  const [reviews, setReviews] = useState(getPendingReviews);
  const [rating, setRating] = useState(getAverageRating);
  const [rejectingReviewId, setRejectingReviewId] = useState(null); // review shown in the Reject popup
  const [toastMessage, setToastMessage] = useState(null);

  const closeToast = useCallback(() => setToastMessage(null), []);

  function removeReview(id) {
    setReviews((current) => current.filter((review) => review.id !== id));
  }

  // Temporary: only updates the page; the approved review joins the average.
  // BACKEND: also tell the API the review is approved, so it shows on the website.
  function approveReview(id) {
    const review = reviews.find((pendingReview) => pendingReview.id === id);
    setRating((current) => ({
      average: (current.average * current.count + review.rating) / (current.count + 1),
      count: current.count + 1,
    }));
    removeReview(id);
    setToastMessage("Review approved");
  }

  // Temporary: only updates the page.
  // BACKEND: also tell the API the review is rejected, and send the popup's reason to the customer.
  function rejectReview(id) {
    removeReview(id);
    setRejectingReviewId(null);
  }

  return (
    <section className="reviews-to-approve" aria-labelledby="reviews-to-approve-title">
      <h2 id="reviews-to-approve-title" className="reviews-to-approve-title">
        Reviews to approve
      </h2>

      <div className="reviews-to-approve-summary">
        <p className="reviews-to-approve-average">{rating.average.toFixed(1)}</p>
        <div>
          <StarRating rating={Math.round(rating.average)} className="review-stars-large" />
          <p className="reviews-to-approve-count">Average from {rating.count} approved reviews</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="reviews-to-approve-empty">No reviews waiting for approval.</p>
      ) : (
        <ul className="reviews-to-approve-list">
          {reviews.map((review) => (
            <li key={review.id} className="pending-review">
              <div className="pending-review-row">
                <StarRating rating={review.rating} />

                <div className="pending-review-actions">
                  <button
                    type="button"
                    className="pending-review-reject"
                    aria-label={`Reject ${review.customerName}'s review`}
                    onClick={() => setRejectingReviewId(review.id)}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="pending-review-approve"
                    aria-label={`Approve ${review.customerName}'s review`}
                    onClick={() => approveReview(review.id)}
                  >
                    Approve
                  </button>
                </div>
              </div>

              <p className="pending-review-text">{review.text}</p>
              <p className="pending-review-meta">
                {review.customerName} · {review.service} · {formatTimeAgo(review.submittedAt)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {rejectingReviewId && (
        <ReasonPopup
          icon={rejectIcon}
          title="Reject this review?"
          description="It won’t appear on the website. The customer will receive your reason below."
          fieldLabel="Reason sent to the customer"
          placeholder="e.g. Your review included a phone number, so we couldn’t post it."
          isRequired
          confirmLabel="Reject review"
          onCancel={() => setRejectingReviewId(null)}
          onConfirm={() => rejectReview(rejectingReviewId)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </section>
  );
}
