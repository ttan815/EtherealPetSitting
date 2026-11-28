import { useState } from "react";
import RecentlyApprovedList from "./RecentlyApprovedList";
import { getApprovedReviews } from "../../../services/reviews/review-service";

/**
 * Renders the admin Reviews page inside the employee dashboard.
 * @returns {JSX.Element} The reviews page.
 */
export default function Review() {
    const [approved, setApproved] = useState(() => getApprovedReviews());

    return (
        <div>
            {/* TODO: header, rating card, tabs and review list go here */}
            <RecentlyApprovedList reviews={approved} />
        </div>
    );
}