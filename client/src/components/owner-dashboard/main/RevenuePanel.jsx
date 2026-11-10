// Renders the revenue panel on the owner dashboard.
import { useState } from "react";
import downloadIcon from "../../../assets/owner-dashboard/export-download.svg";
import arrowIcon from "../../../assets/owner-dashboard/link-arrow.svg";
import "../../../styles/owner-dashboard/RevenuePanel.css";

const RANGE_OPTIONS = [
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "custom", label: "Custom" },
];

// Temporary placeholder numbers for each range (Figma "Admin — Dashboard" shows Month).
// BACKEND: the get... methods below should load these from the API instead.
// Week: this week compared with last week; the chart shows the last 4 weeks.
// Custom: TODO add a date picker; for now it shows a sample custom range.
const PLACEHOLDER_REVENUE = {
  week: {
    summary: { total: 1240, periodLabel: "This week", changePercent: -7, comparedTo: "last week", unpaidVisitCount: 3, unpaidAmount: 180 },
    weeks: [
      { label: "Sep 1", amount: 980 },
      { label: "Sep 8", amount: 1310 },
      { label: "Sep 15", amount: 1330 },
      { label: "Sep 22", amount: 1240, isCurrent: true },
    ],
    services: [
      { name: "Dog Walking", amount: 470 },
      { name: "Overnight Stays", amount: 340 },
      { name: "Drop-in Care", amount: 225 },
      { name: "Whole Day Care", amount: 125 },
      { name: "Medication", amount: 60 },
      { name: "Nail Trims", amount: 20 },
    ],
  },
  month: {
    summary: { total: 4860, periodLabel: "September 2026", changePercent: 8, comparedTo: "August", unpaidVisitCount: 3, unpaidAmount: 180 },
    weeks: [
      { label: "Wk 1", amount: 980 },
      { label: "Wk 2", amount: 1310 },
      { label: "Wk 3", amount: 1330 },
      { label: "Wk 4", amount: 1240, isCurrent: true },
    ],
    services: [
      { name: "Dog Walking", amount: 1850 },
      { name: "Overnight Stays", amount: 1310 },
      { name: "Drop-in Care", amount: 875 },
      { name: "Whole Day Care", amount: 485 },
      { name: "Medication", amount: 240 },
      { name: "Nail Trims", amount: 100 },
    ],
  },
  custom: {
    summary: { total: 7700, periodLabel: "Custom range (Aug 18 – Sep 27)", changePercent: 5, comparedTo: "the 6 weeks before", unpaidVisitCount: 3, unpaidAmount: 180 },
    weeks: [
      { label: "Aug 18", amount: 1120 },
      { label: "Aug 25", amount: 1290 },
      { label: "Sep 1", amount: 1410 },
      { label: "Sep 8", amount: 1310 },
      { label: "Sep 15", amount: 1330 },
      { label: "Sep 22", amount: 1240, isCurrent: true },
    ],
    services: [
      { name: "Dog Walking", amount: 2930 },
      { name: "Overnight Stays", amount: 2080 },
      { name: "Drop-in Care", amount: 1390 },
      { name: "Whole Day Care", amount: 770 },
      { name: "Medication", amount: 380 },
      { name: "Nail Trims", amount: 150 },
    ],
  },
};

// Temporary: total earnings, % change, and unpaid visits for the range
function getRevenueSummary(range) {
  return PLACEHOLDER_REVENUE[range].summary;
}

// Temporary: earnings per week for the chart; isCurrent marks this week
function getRevenueByWeek(range) {
  return PLACEHOLDER_REVENUE[range].weeks;
}

// Temporary: earnings per service, largest first
function getEarningsByService(range) {
  return PLACEHOLDER_REVENUE[range].services;
}

// Temporary: does nothing yet.
// BACKEND: download the revenue report for this range.
function exportRevenue(range) {
  console.log("Export revenue:", range);
}

const BAR_MAX_HEIGHT = 150; // px, the tallest week (Figma)

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
            {RANGE_OPTIONS.map((option) => (
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

          <button type="button" className="revenue-panel-export" onClick={() => exportRevenue(range)}>
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
                  style={{ height: `${(week.amount / highestWeek) * BAR_MAX_HEIGHT}px` }}
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
