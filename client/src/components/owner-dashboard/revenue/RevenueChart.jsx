
import React, { useEffect, useState } from "react";
import { getRevenue } from "../../../services/revenue-service";

/**
 * Formats a revenue value as currency.
 * @param {number} amount Revenue amount
 * @returns {string} Formatted currency
 */
export function formatRevenue(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount || 0);
}

/**
 * Normalizes revenue records for chart rendering.
 * Supports numeric entries and objects containing date/label and revenue/amount.
 * @param {Array} records Revenue records
 * @returns {Array} Normalized chart data
 */
export function normalizeRevenue(records) {
  return records.map((item, index) => {
    if (typeof item === "number") {
      return {
        label: `Period ${index + 1}`,
        date: null,
        revenue: item,
        isCurrent: false
      };
    }

    return {
      label: item.label || item.date || item.unitDate || `Period ${index + 1}`,
      date: item.date || item.unitDate || null,
      revenue: Number(item.revenue ?? item.amount ?? item.total ?? 0),
      isCurrent: Boolean(item.isCurrent)
    };
  });
}

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
          setRevenueData(normalizeRevenue(result || []));
        }
      } catch (err) {
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
    } else {
      setRevenueData([]);
    }

    return () => {
      active = false;
    };
  }, [unitDate]);

  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.revenue),
    0
  );

  const chartMax = maxRevenue > 0 ? maxRevenue * 1.12 : 1;

  /**
   * Determines whether a chart bar represents the current period.
   * @param {Object} item Revenue chart record
   * @returns {boolean} Whether the record is current
   */
  function isCurrentPeriod(item) {
    if (item.isCurrent) return true;

    return Boolean(
      currentUnitDate &&
      item.date &&
      item.date === currentUnitDate
    );
  }

  return (
    <section className="revenue-card revenue-chart-card">

      <div className="revenue-section-heading">
        <div>
          <h2>Earnings by month</h2>
          <p>
            {currentView === "week" && "Last 7 days"}
            {currentView === "month" && "Last 6 months"}
            {currentView === "year" && "Last 12 months"}
            {currentView === "custom" && "Custom date range"}
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

              const isCurrent = isCurrentPeriod(item);

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

                  <span className="revenue-bar-label">
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