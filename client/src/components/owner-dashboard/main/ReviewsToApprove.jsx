// Renders the reviews to approve card on the owner dashboard.
import { useCallback, useState } from "react";
import ReasonPopup from "../../popup/ReasonPopup";
import Toast from "../../popup/Toast";
import rejectIcon from "../../../assets/owner-dashboard/reject-review-icon.svg";
import {
  approveReview as approveReviewInService,
  getAverageRating,
  getPendingReviews,
  rejectReview as rejectReviewInService,
} from "../../../services/reviews/review-service";
import { REVIEW_DAY_MS } from "../../../constants/reviews/reviews";
import "../../../styles/owner-dashboard/ReviewsToApprove.css";
import StarRating from "../../parent-component/StarRating";

// "Today", "1 day ago", "5 days ago"
function formatTimeAgo(date) {
  const days = Math.floor((Date.now() - date.getTime()) / REVIEW_DAY_MS);
  if (days < 1) return "Today";
  return days === 1 ? "1 day ago" : `${days} days ago`;
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

  // Temporary: only updates the page; the approved review joins the average.
  // BACKEND: also tell the API the review is approved, so it shows on the website.
  function approveReview(id) {
    const review = approveReviewInService(id);
    if (!review) return;
    setRating((current) => ({
      average: (current.average * current.count + review.rating) / (current.count + 1),
      count: current.count + 1,
    }));
    setReviews((current) => current.filter((pendingReview) => pendingReview.id !== id));
    setToastMessage("Review approved");
  }

  // Temporary: only updates the page.
  // BACKEND: also tell the API the review is rejected, and send the popup's reason to the customer.
  function handleRejectReview(id, reason) {
    if (!rejectReviewInService(id, reason)) return;
    setReviews((current) => current.filter((review) => review.id !== id));
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
          onConfirm={(reason) => handleRejectReview(rejectingReviewId, reason)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </section>
  );
}
