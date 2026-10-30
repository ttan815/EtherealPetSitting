// dt277 reviews page
// shows the overall rating, a list of customer reviews, and the write a review popup,
// with the standard top navigation bar and footer

// react tool for remembering if the popup is open
import { useState } from "react";
// team navigation bar and footer
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
// tells us who is logged in
import { useAuth } from "../context/AuthContext";
// the three review pieces
import OverallRating from "../components/reviews/OverallRating";
import ReviewCard from "../components/reviews/ReviewCard";
import WriteReviewModal from "../components/reviews/WriteReviewModal";
// styles for this page
import "../styles/reviews/ReviewsPage.css";

// sample reviews until real reviews come from the server
const SAMPLE_REVIEWS = [
  // first sample review
  { id: 1, initials: "TT", petName: "Oreo Cat", rating: 4, date: "August 15, 2026", comment: "I had a really great experience. They provided a comprehensive checkup and care for our two cats!" },
  // second sample review
  { id: 2, initials: "AP", petName: "Bean Cat", rating: 4, date: "August 15, 2026", comment: "Very professional service. It was quick, and the appointment setup was very easy." },
];

function ReviewsPage() {
  // who is logged in, same pattern as the home page
  const { user, loading } = useAuth();
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
        <OverallRating reviews={SAMPLE_REVIEWS} onWriteReview={() => setIsWriting(true)} />

        {/* list of reviews */}
        <div className="reviews-page-list">
          {SAMPLE_REVIEWS.map((review) => (
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
