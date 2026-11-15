// dt277 reviews page
// shows the overall rating, a list of customer reviews, and the write a review popup,
// with the standard top navigation bar and footer

// react tool for remembering if the popup is open
import { useState } from "react";
// team navigation bar and footer
import NavigationBar from "../components/homepage/NavigationBar";
import Footer from "../components/homepage/Footer";
// tells us who is logged in
import { useAuth } from "../context/AuthContext";
// the three review pieces
import OverallRating from "../components/reviews/OverallRating";
import ReviewCard from "../components/reviews/ReviewCard";
import WriteReviewModal from "../components/reviews/WriteReviewModal";
import { getPublicReviews } from "../services/review-service";
// styles for this page
import "../styles/reviews/ReviewsPage.css";

/**
 * Renders the full customer reviews page and review submission entry point.
 * @returns {JSX.Element} The reviews page.
 */
function ReviewsPage() {
  // who is logged in, same pattern as the home page
  const { user, loading } = useAuth();
  const reviews = getPublicReviews();
  // true when the write a review popup is showing
  const [isWriting, setIsWriting] = useState(false);

  // wait until we know who is logged in
  if (loading) return null;
  // visitors have no role
  const role = user?.role ?? "visitor";

  // what the page looks like
  return (
    <>
      <NavigationBar role={role} user={user} />
      <main className="reviews-page">
        {/* page title */}
        <header className="reviews-page-header">
          <h1 className="reviews-page-title">Reviews</h1>
          <p className="reviews-page-subtitle">See what pet owners are saying.</p>
        </header>

        {/* rating summary with the write a review button */}
        <OverallRating reviews={reviews} onWriteReview={() => setIsWriting(true)} />

        {/* list of reviews */}
        <div className="reviews-page-list">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </main>
      <Footer />

      {/* popup, only shows when write a review is clicked */}
      <WriteReviewModal open={isWriting} onClose={() => setIsWriting(false)} />
    </>
  );
}

export default ReviewsPage;
