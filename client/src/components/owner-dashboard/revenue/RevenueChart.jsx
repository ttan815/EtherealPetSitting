
import { useEffect, useState } from "react";
import {
  formatRevenue,
  getRevenue,
  getRevenuePeriodLabel,
  isCurrentRevenuePeriod,
  normalizeRevenue
} from "../../../services/owner-dashboard/revenue-service";

/**
 * Revenue chart component.
 * @param {Object} props Chart configuration
 * @param {string} props.unitDate Selected date or date range passed to getRevenue
 * @param {string} props.currentView Selected view (week, month, year, custom)
 * @param {string} props.currentUnitDate Date identifying the current period
 * @returns {JSX.Element} Revenue bar chart
 */
export default function RevenueChart({
  unitDate,
  currentView = "month",
  currentUnitDate
}) {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    /**
     * Loads revenue data using the existing helper.
     * @returns {void}
     */
    async function loadRevenue() {
      setLoading(true);
      setError("");

      try {
        // Existing helper is intentionally not modified.
        const result = await Promise.resolve(getRevenue(unitDate));

        if (active) {
          setRevenueData(normalizeRevenue(result || [], currentView));
        }
      } catch {
        if (active) {
          setError("Unable to load revenue data.");
          setRevenueData([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (unitDate) {
      loadRevenue();
    }

    return () => {
      active = false;
    };
  }, [unitDate, currentView]);

  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.revenue),
    0
  );

  const chartMax = maxRevenue > 0 ? maxRevenue * 1.12 : 1;

  return (
    <section className="revenue-card revenue-chart-card">

      <div className="revenue-section-heading">
        <div>
          <h2>
            {currentView === "week" ? "Earnings by day" :
              currentView === "year" ? "Earnings by year" : "Earnings by month"}
          </h2>
          <p>
            {getRevenuePeriodLabel(currentView)}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="revenue-chart-message">
          Loading revenue...
        </div>
      ) : error ? (
        <div className="revenue-chart-message revenue-error">
          {error}
        </div>
      ) : revenueData.length === 0 ? (
        <div className="revenue-chart-message">
          No revenue data available.
        </div>
      ) : (
        <div className="revenue-chart">

          <div className="revenue-chart-bars">

            {revenueData.map((item, index) => {
              const barHeight = Math.max(
                (item.revenue / chartMax) * 100,
                2
              );

              const isCurrent = isCurrentRevenuePeriod(item, currentUnitDate);

              return (
                <div
                  className="revenue-chart-column"
                  key={`${item.label}-${index}`}
                >

                  <span className="revenue-bar-value">
                    {formatRevenue(item.revenue)}
                  </span>

                  <div className="revenue-bar-container">
                    <div
                      className={`revenue-bar ${
                        isCurrent ? "revenue-bar-current" : ""
                      }`}
                      style={{
                        height: `${barHeight}%`
                      }}
                      title={`${item.label}: ${formatRevenue(item.revenue)}`}
                    />
                  </div>

                  <span className={`revenue-bar-label${isCurrent ? " revenue-bar-label-current" : ""}`}>
                    {item.label}
                  </span>

                </div>
              );
            })}

          </div>
        </div>
      )}

    </section>
  );
}