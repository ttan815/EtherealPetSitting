// Renders the review section component.
import SectionHeading from "./SectionHeading";
import Button from "../form/Button";
import { getHomepageReviews, getPublicReviewSummary } from "../../services/reviews/review-service";
import topo1 from "../../assets/home/reviews-topo-1.svg";
import topo2 from "../../assets/home/reviews-topo-2.svg";
import topo3 from "../../assets/home/reviews-topo-3.svg";
import "../../styles/homepage/ReviewSection.css";

// Home page reviews (Figma "Reviews"): rating summary, review cards, link to all reviews.
/**
 * Renders the homepage review highlights and link to all reviews.
 * @returns {JSX.Element} The homepage review section.
 */
export default function ReviewsSection() {
  const reviews = getHomepageReviews();
  const rating = getPublicReviewSummary();
  return (
    <section id="reviews" className="reviews-section" aria-labelledby="reviews-heading">
      <div className="reviews-topo" aria-hidden="true">
        <img className="reviews-topo-line reviews-topo-line-1" src={topo1} alt="" />
        <img className="reviews-topo-line reviews-topo-line-2" src={topo2} alt="" />
        <img className="reviews-topo-line reviews-topo-line-3" src={topo3} alt="" />
      </div>

      <div className="reviews-inner">
        <SectionHeading id="reviews-heading" eyebrow="Reviews" title="What Pet Parents Say">
          <div className="reviews-summary">
            <p className="reviews-score">{rating.average.toFixed(1)}</p>
            <div>
              <p className="reviews-stars" aria-label={`${rating.average} out of 5 stars`}>★★★★★</p>
              <p className="reviews-summary-note">Average rating from completed visits</p>
            </div>
          </div>
        </SectionHeading>

        <ul className="reviews-cards">
          {reviews.map((review) => (
            <li key={review.id} className="reviews-card">
              <p className="reviews-card-stars" aria-label="5 out of 5 stars">★★★★★</p>
              <p className="reviews-card-text">{review.text}</p>
              <div className="reviews-card-reviewer">
                <span className="reviews-card-avatar" aria-hidden="true">CN</span>
                <div>
                  <p className="reviews-card-name">Customer Name</p>
                  <p className="reviews-card-meta">{review.service} · Verified visit</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="reviews-footer">
          <Button variant="outline" type="button" href="/reviews">
            See All Reviews
          </Button>
          <p className="reviews-footnote">Reviews can be left after a completed visit.</p>
        </div>
      </div>
    </section>
  );
}
