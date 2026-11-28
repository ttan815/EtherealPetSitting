// Renders the recently approved reviews on the admin Reviews page (DT-374).
import StarRating from "../../parent-component/StarRating";
import "../../../styles/employee-dashboard/RecentlyApprovedList.css";

// "Sep 19"
function formatApprovedDate(date) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// "Emma R." → "ER"
function getInitials(name) {
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

/**
 * Renders the latest approved reviews for admins. Admins can't remove reviews, so there is no Remove button.
 * @param {Object[]} reviews Approved reviews with an approvedAt date.
 * @returns {JSX.Element} The recently approved section.
 */
export default function RecentlyApprovedList({ reviews }) {
    return (
        <section className="recently-approved" aria-labelledby="recently-approved-title">
            <div className="recently-approved-heading">
                <h2 id="recently-approved-title" className="recently-approved-title">Recently approved</h2>
                <p className="recently-approved-subtitle">Showing on the website</p>
            </div>

            {reviews.length === 0 ? (
                <p className="recently-approved-empty">No approved reviews yet.</p>
            ) : (
                <ul className="recently-approved-list">
                    {reviews.map((review) => (
                        // TODO: reusable <ReviewCard> component not available
                        <li key={review.id} className="recently-approved-card">
                            <div className="recently-approved-top">
                                <StarRating rating={review.rating} />
                                {/* TODO: reusable <StatusPill> component not available */}
                                <span className="recently-approved-pill">✓ Approved</span>
                            </div>

                            <p className="recently-approved-text">{review.text}</p>

                            <div className="recently-approved-author">
                                {/* TODO: reusable <Avatar> component not available */}
                                <span className="recently-approved-avatar" aria-hidden="true">
                                    {getInitials(review.customerName)}
                                </span>
                                <div>
                                    <p className="recently-approved-name">{review.customerName}</p>
                                    <p className="recently-approved-meta">
                                        {[review.petName, review.service, `Approved ${formatApprovedDate(review.approvedAt)}`]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}