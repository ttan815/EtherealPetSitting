// deposits card, how much customers pay online based on how far ahead they book
import { CircleDollarSign, Info } from "lucide-react";
import { PriceInput } from "./ServicePrices";
import "../../../styles/owner-dashboard/settings/Settings.css";

/**
 * Renders the deposits card with one amount per booking window.
 * @param {Array} deposits The { days, amount } deposit tiers.
 * @param {Object} errors Error messages keyed by number of days.
 * @param {Function} onChange Called with the updated deposits array.
 * @returns {JSX.Element} The deposits card.
 */
export default function Deposits({ deposits, errors, onChange }) {
    function update(days, amount) {
        onChange(deposits.map((d) => (d.days === days ? { ...d, amount } : d)));
    }

    return (
        <section className="st-card" aria-labelledby="st-deposits-title">
            <div className="st-card-header">
                <span className="st-card-icon" aria-hidden="true"><CircleDollarSign size={18} strokeWidth={1.75} /></span>
                <div>
                    <h2 id="st-deposits-title" className="st-card-title">Deposits</h2>
                    <p className="st-card-subtitle">
                        Customers pay this online when they book. It depends on how far ahead they book.
                    </p>
                </div>
            </div>

            <ul className="st-rows">
                {deposits.map((deposit) => (
                    <li key={deposit.days} className="st-row">
                        <span className="st-row-label">Booked up to {deposit.days} days ahead</span>
                        <div className="st-row-right">
                            <PriceInput
                                id={`st-deposit-${deposit.days}`}
                                label={`Deposit for bookings up to ${deposit.days} days ahead`}
                                value={deposit.amount}
                                invalid={Boolean(errors[deposit.days])}
                                onChange={(amount) => update(deposit.days, amount)}
                            />
                            {errors[deposit.days] && <p className="st-error">{errors[deposit.days]}</p>}
                        </div>
                    </li>
                ))}
            </ul>

            <p className="st-hint">
                <Info size={14} strokeWidth={1.75} aria-hidden="true" />
                Card details are never saved. The rest can be paid in cash or online.
            </p>
        </section>
    );
}
