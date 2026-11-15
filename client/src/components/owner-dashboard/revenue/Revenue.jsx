// Renders the owner's Revenue page (Figma User Flow "Owner — Revenue").
import { useCallback, useState } from "react";
import PageHeader from "../../parent-component/PageHeader";
import Toast from "../../popup/Toast";
import RevenueOverview from "./RevenueOverview";
import { REVENUE_VIEW_OPTIONS } from "../../../constants/revenue";
import { exportRevenueSummary, getRevenueView } from "../../../services/revenue-service";
import exportIcon from "../../../assets/owner-dashboard/export-summary.svg";
import toastDownloadIcon from "../../../assets/owner-dashboard/toast-download.svg";
import "../../../styles/owner-dashboard/revenue/Revenue.css";

/**
 * Renders the Revenue page: the header with the Week / Month / Year view and Export summary,
 * then the Overview cards. The revenue chart, revenue by service and Still owed table come in their own subtasks.
 * @returns {JSX.Element} The Revenue page.
 */
export default function Revenue() {
    const [viewBy, setViewBy] = useState("month");
    const [toastMessage, setToastMessage] = useState(null);

    const view = getRevenueView(viewBy);
    const closeToast = useCallback(() => setToastMessage(null), []);

    function exportSummary() {
        if (exportRevenueSummary(view)) {
            setToastMessage("Summary exported");
        }
    }

    return (
        <section className="revenue-page">
            <PageHeader
                title={
                    <span className="revenue-page-title">
                        Revenue
                        {/* TODO: reusable <OwnerTag> component not available */}
                        <span className="revenue-page-tag">Owner</span>
                    </span>
                }
                subtitle="Track earnings, deposits, and anyone who still owes."
                showBell={false}
            >
                {/* TODO: reusable <SegmentedControl> component not available */}
                <div className="revenue-page-view" role="group" aria-label="Current view">
                    {REVENUE_VIEW_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            className="revenue-page-view-option"
                            aria-pressed={viewBy === option.id}
                            onClick={() => setViewBy(option.id)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <button type="button" className="revenue-page-export" onClick={exportSummary}>
                    <img src={exportIcon} alt="" />
                    Export summary
                </button>
            </PageHeader>

            <RevenueOverview unitDate={view.unit} />

            {toastMessage && <Toast message={toastMessage} icon={toastDownloadIcon} onClose={closeToast} />}
        </section>
    );
}
