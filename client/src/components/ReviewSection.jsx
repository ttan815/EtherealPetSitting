import "../styles/ReviewSection.css";

export default function ReviewsSection() {
  return (
    <section
      className="reviews-section"
      aria-labelledby="reviews-heading"
    >
      <div className="reviews-decoration" aria-hidden="true">
        <svg viewBox="0 0 300 300" preserveAspectRatio="none">
          <path d="M-55 5 C35 -8 93 36 112 84 C136 144 65 177 -55 226" />
          <path d="M-30 -28 C91 -22 160 39 180 91 C211 170 114 215 -30 278" />
          <path d="M38 -60 C160 -35 229 30 251 91 C281 174 188 237 38 310" />
        </svg>
      </div>

      <div className="reviews-content">
        <p className="reviews-eyebrow">
          REVIEWS
        </p>

        <h1 id="reviews-heading">
          What Pet Parents Say
        </h1>

        <button
          className="reviews-button"
          type="button"
        >
          See All Reviews
        </button>

        <p className="reviews-footnote">
          Reviews can be left after a completed visit.
        </p>
      </div>
    </section>
  );
}
