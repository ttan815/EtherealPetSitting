import { REVIEW_DAY_MS } from "../../constants/reviews/reviews";

const HOMEPAGE_REVIEWS = [
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

const PUBLIC_REVIEWS = [
    { id: 1, initials: "TT", petName: "Oreo Cat", rating: 4, date: "August 15, 2026", comment: "I had a really great experience. They provided a comprehensive checkup and care for our two cats!" },
    { id: 2, initials: "AP", petName: "Bean Cat", rating: 4, date: "August 15, 2026", comment: "Very professional service. It was quick, and the appointment setup was very easy." },
];

const PENDING_REVIEWS = [
    { id: "review-sarah", rating: 5, text: "Took such good care of our pup. Updates after every visit!", customerName: "Sarah M.", service: "Dog Walking", submittedAt: () => new Date(Date.now() - 2 * REVIEW_DAY_MS) },
    { id: "review-priya", rating: 5, text: "So organized with our cat’s medication. Highly recommend.", customerName: "Priya K.", service: "Medication", submittedAt: () => new Date(Date.now() - 5 * REVIEW_DAY_MS) },
    { id: "review-kevin", rating: 4, text: "Great with our anxious lab. Would book again.", customerName: "Kevin P.", service: "Overnight Stay", submittedAt: () => new Date(Date.now() - 6 * REVIEW_DAY_MS) },
];
let pendingReviewIds = PENDING_REVIEWS.map((review) => review.id);

const APPROVED_REVIEWS = [
    { id: "review-emma", rating: 5, petName: "Oliver", text: "Our cat was so relaxed when we got home. Thank you!", customerName: "Emma R.", service: "Drop-in Care", approvedAt: () => new Date(Date.now() - 1 * REVIEW_DAY_MS) },
    { id: "review-jon", rating: 4, petName: "Biscuit", text: "Easy booking and great communication.", customerName: "Jon D.", service: "Dog Walking", approvedAt: () => new Date(Date.now() - 3 * REVIEW_DAY_MS) },
];
let approvedReviews = APPROVED_REVIEWS.map((review) => ({ ...review, approvedAt: review.approvedAt() }));

/**
 * Fetches the most recently approved reviews, newest first.
 * @param {number} limit Maximum number of reviews to return.
 * @returns {Object[]} Approved reviews with an approvedAt date.
 */
export function getApprovedReviews(limit = 5) {
    const temp = [...approvedReviews]
        .sort((a, b) => b.approvedAt - a.approvedAt)
        .slice(0, limit); // Result from fetch()
    return temp;
}

/**
 * Fetches temporary reviews for the homepage.
 * @returns {Object[]} Homepage review highlights.
 */
export function getHomepageReviews() {
    return HOMEPAGE_REVIEWS.map((review) => ({ ...review }));
}

/**
 * Fetches temporary public customer reviews.
 * @returns {Object[]} Public reviews.
 */
export function getPublicReviews() {
    return PUBLIC_REVIEWS.map((review) => ({ ...review }));
}

/**
 * Fetches the temporary public rating summary.
 * @returns {{average: number, count: number}} Public rating summary.
 */
export function getPublicReviewSummary() {
    return { average: 5, count: 24 };
}

/**
 * Fetches temporary reviews awaiting owner approval.
 * @returns {Object[]} Pending reviews.
 */
export function getPendingReviews() {
    return PENDING_REVIEWS
        .filter((review) => pendingReviewIds.includes(review.id))
        .map((review) => ({ ...review, submittedAt: review.submittedAt() }));
}

/**
 * Fetches the temporary average rating from approved reviews.
 * @returns {{average: number, count: number}} Rating summary.
 */
export function getAverageRating() {
    return { average: 5, count: 24 };
}

/**
 * Approves a temporary customer review.
 * @param {string|number} id Review ID.
 * @returns {Object|null} The approved review, or null when it was not found.
 */
export function approveReview(id) {
    const review = getPendingReviews().find((item) => String(item.id) === String(id));
    if (!review) {
        return null;
    }
    pendingReviewIds = pendingReviewIds.filter((reviewId) => reviewId !== review.id);
    approvedReviews.push({ ...review, approvedAt: new Date() });
    return review;
}

/**
 * Rejects a temporary customer review.
 * @param {string|number} id Review ID.
 * @param {string} reason Reason sent to the customer.
 * @returns {boolean} Whether the review was rejected.
 */
export function rejectReview(id, reason) {
    if (!reason?.trim() || !pendingReviewIds.includes(id)) {
        return false;
    }
    pendingReviewIds = pendingReviewIds.filter((reviewId) => reviewId !== id);
    return true;
}
