import "../../styles/parent-component/StarRating.css";
/**
 * Renders filled and faded stars for a rating out of 5.
 * @param {number} rating Number of filled stars.
 * @param {string} className Extra class for sizing.
 * @returns {JSX.Element} The star rating.
 */
export default function StarRating({ rating, className = "" }) {
    return (
        <span className={`review-stars ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= rating ? "" : "review-star-empty"}>★</span>
            ))}
        </span>
    );
}