import SectionHeading from "./SectionHeading";
import Button from "./form/Button";
import topo1 from "../assets/home/reviews-topo-1.svg";
import topo2 from "../assets/home/reviews-topo-2.svg";
import topo3 from "../assets/home/reviews-topo-3.svg";
import "../styles/ReviewSection.css";

// Placeholder reviews copied from Figma, until real reviews come from the server
const PLACEHOLDER_REVIEWS = [
  {
    id: 1,
    text: "Angelena took such good care of our pup while we were away. We got updates after every visit and came home to a happy, relaxed dog.",
    service: "Overnight Stays",
  },
  {
    id: 2,
    text: "Reliable, kind, and so organized. She remembered every detail of our cat's medication schedule and made us feel completely at ease.",
    service: "Medication",
  },
  {
    id: 3,
    text: "Our dog lights up when she arrives. Booking is easy, and we never have to worry about whether our pets are in good hands.",
    service: "Dog Walking",
  },
];

// Home page reviews (Figma "Reviews"): rating summary, review cards, link to all reviews.
export default function ReviewsSection() {
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
            <p className="reviews-score">5.0</p>
            <div>
              <p className="reviews-stars" aria-label="5 out of 5 stars">★★★★★</p>
              <p className="reviews-summary-note">Average rating from completed visits</p>
            </div>
          </div>
        </SectionHeading>

        <ul className="reviews-cards">
          {PLACEHOLDER_REVIEWS.map((review) => (
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
          <Button variant="outline" type="button">
            See All Reviews
          </Button>
          <p className="reviews-footnote">Reviews can be left after a completed visit.</p>
        </div>
      </div>
    </section>
  );
}
