// Renders the revenue panel on the owner dashboard.
import { useState } from "react";
import downloadIcon from "../../../assets/owner-dashboard/export-download.svg";
import arrowIcon from "../../../assets/owner-dashboard/link-arrow.svg";
import { DASHBOARD_REVENUE_RANGE_OPTIONS, REVENUE_BAR_MAX_HEIGHT } from "../../../constants/revenue";
import {
  exportDashboardRevenue,
  getEarningsByService,
  getRevenueByWeek,
  getRevenueSummary,
} from "../../../services/revenue-service";
import "../../../styles/owner-dashboard/RevenuePanel.css";

// "$4,860"
function formatMoney(amount) {
  return `$${amount.toLocaleString("en-US")}`;
}

/**
 * Renders the owner's earnings for a Week / Month / Custom range: total, weekly chart, and earnings by service.
 * @param {{onNavigate: Function}} props - Called with "revenue" when the unpaid visits link is clicked.
 * @returns {JSX.Element} The revenue panel.
 */
export default function RevenuePanel({ onNavigate }) {
  const [range, setRange] = useState("month");

  const summary = getRevenueSummary(range);
  const weeks = getRevenueByWeek(range);
  const services = getEarningsByService(range);
  const highestWeek = Math.max(...weeks.map((week) => week.amount));
  const changeSign = summary.changePercent >= 0 ? "+" : "−";

  return (
    <section className="revenue-panel" aria-labelledby="revenue-panel-title">
      <div className="revenue-panel-header">
        <div className="revenue-panel-heading">
          <h2 id="revenue-panel-title" className="revenue-panel-title">
            Revenue
          </h2>
          <span className="revenue-panel-tag">Owner</span>
        </div>

        <div className="revenue-panel-controls">
          <div className="revenue-panel-range" role="group" aria-label="Date range">
            {DASHBOARD_REVENUE_RANGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className="revenue-panel-range-option"
                aria-pressed={range === option.id}
                onClick={() => setRange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button type="button" className="revenue-panel-export" onClick={() => exportDashboardRevenue(range)}>
            <img src={downloadIcon} alt="" />
            Export
          </button>
        </div>
      </div>

      <div className="revenue-panel-body">
        <div className="revenue-panel-totals">
          <p className="revenue-panel-total">{formatMoney(summary.total)}</p>
          <p className="revenue-panel-period">Total earnings · {summary.periodLabel}</p>
          <p className="revenue-panel-change">
            {changeSign}
            {Math.abs(summary.changePercent)}% vs {summary.comparedTo}
          </p>

          <ul className="revenue-chart" aria-label="Earnings by week">
            {weeks.map((week) => (
              <li key={week.label} className="revenue-chart-week">
                <span className="revenue-chart-amount">{formatMoney(week.amount)}</span>
                <span
                  className={`revenue-chart-bar${week.isCurrent ? " revenue-chart-bar-current" : ""}`}
                  style={{ height: `${(week.amount / highestWeek) * REVENUE_BAR_MAX_HEIGHT}px` }}
                />
                <span className="revenue-chart-label">{week.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="revenue-panel-services">
          <h3 className="revenue-panel-services-title">Earnings by service</h3>

          <ul className="revenue-services-list">
            {services.map((service) => (
              <li key={service.name} className="revenue-service">
                <div className="revenue-service-labels">
                  <span>{service.name}</span>
                  <span className="revenue-service-amount">{formatMoney(service.amount)}</span>
                </div>
                {/* Bar length = this service's share of total earnings */}
                <span className="revenue-service-track">
                  <span
                    className="revenue-service-fill"
                    style={{ width: `${(service.amount / summary.total) * 100}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>

          <button type="button" className="revenue-panel-unpaid" onClick={() => onNavigate("revenue")}>
            View {summary.unpaidVisitCount} unpaid visits ({formatMoney(summary.unpaidAmount)})
            <img src={arrowIcon} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}
