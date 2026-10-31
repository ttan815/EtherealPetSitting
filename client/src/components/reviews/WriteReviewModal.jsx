// dt280 write a review component
// popup where the customer picks stars, writes a comment, and posts it
// shows a message if something is missing, and a thank you message after posting

// react tools for remembering values and running code when things change
import { useEffect, useState } from "react";
// shared star row
import StarRating from "./StarRating";
// styles for the popup
import "../../styles/reviews/WriteReviewModal.css";

// longest comment allowed
const MAX_LENGTH = 400;

// open shows or hides the popup, on close hides it, on submit gets the new review
/**
 * Renders the review-submission dialog when it is open.
 * @param {Object} props - Modal state and submission callbacks.
 * @param {boolean} props.open - Whether the dialog should be displayed.
 * @param {Function} props.onClose - Called when the dialog is dismissed.
 * @param {Function} props.onSubmit - Called with the submitted review details.
 * @returns {JSX.Element|null} The review dialog, or null while closed.
 */
function WriteReviewModal({ open, onClose, onSubmit }) {
  // the stars the customer picked, 0 means none yet
  const [rating, setRating] = useState(0);
  // the comment the customer typed
  const [comment, setComment] = useState("");
  // which screen to show: form, error, or success
  const [step, setStep] = useState("form");

  // clear everything whenever the popup opens
  useEffect(() => {
    if (open) {
      setRating(0);
      setComment("");
      setStep("form");
    }
  }, [open]);

  // close the popup when the escape key is pressed
  useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // show nothing when the popup is closed
  if (!open) return null;

  // runs when post review is clicked
  function handlePost() {
    // both a star rating and a comment are required
    if (rating === 0 || comment.trim() === "") {
      setStep("error");
      return;
    }
    // send the review to the page, it will be saved to the server later
    if (onSubmit) onSubmit({ rating, comment: comment.trim() });
    setStep("success");
  }

  // what the popup looks like
  return (
    // dark see through background, clicking it closes the popup
    <div className="write-review-backdrop" onClick={onClose}>
      <div
        className="write-review-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-review-title"
        onClick={(event) => event.stopPropagation()} // clicks inside the box do not close it
      >
        {/* the form screen */}
        {step === "form" && (
          <>
            <h2 id="write-review-title" className="write-review-heading">How would you rate your experience?</h2>
            {/* clickable stars */}
            <StarRating rating={rating} size={34} onSelect={setRating} label="Your rating" />

            <label htmlFor="write-review-comment" className="write-review-heading">Tell us about your experience</label>
            {/* comment box, stops at the max length */}
            <textarea
              id="write-review-comment"
              className="write-review-textarea"
              placeholder="Write your review..."
              maxLength={MAX_LENGTH}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            {/* how many characters are left */}
            <p className="write-review-counter">{MAX_LENGTH - comment.length}/{MAX_LENGTH} characters left</p>

            {/* cancel and post buttons */}
            <div className="write-review-actions">
              <button type="button" className="write-review-cancel" onClick={onClose}>Cancel</button>
              <button type="button" className="write-review-post" onClick={handlePost}>Post Review</button>
            </div>
          </>
        )}

        {/* the error screen when stars or comment are missing */}
        {step === "error" && (
          <div className="write-review-message">
            <h2 id="write-review-title" className="write-review-message-title">Unable to post review</h2>
            <p>Please select a star rating and write a comment before posting your review.</p>
            {/* goes back to the form so the customer can fix it */}
            <button type="button" className="write-review-post" onClick={() => setStep("form")}>Okay</button>
          </div>
        )}

        {/* the thank you screen after posting */}
        {step === "success" && (
          <div className="write-review-message">
            <h2 id="write-review-title" className="write-review-message-title">Review Submitted</h2>
            <p>Your review will appear once it&apos;s approved.</p>
            <button type="button" className="write-review-post" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WriteReviewModal;
