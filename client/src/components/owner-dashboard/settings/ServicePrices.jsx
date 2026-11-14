// services and prices card, turn each service on or off and set its price
import { Tag } from "lucide-react";
import "../../../styles/owner-dashboard/settings/Settings.css";

/**
 * Keeps only digits and one decimal point so price boxes stay numbers only.
 * @param {string} value What the user typed.
 * @returns {string} The cleaned value with at most two decimals.
 */
export function cleanMoney(value) {
    const digits = value.replace(/[^\d.]/g, "");
    const [whole, ...rest] = digits.split(".");
    if (rest.length === 0) return whole;
    return `${whole}.${rest.join("").slice(0, 2)}`;
}

/**
 * Renders an on and off switch.
 * @param {boolean} checked True when switched on.
 * @param {string} label Name read out by screen readers.
 * @param {Function} onChange Called with the new true or false value.
 * @returns {JSX.Element} The switch.
 */
export function Toggle({ checked, label, onChange }) {
    // TODO: reusable toggle switch component not available
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            className={`st-switch${checked ? " is-on" : ""}`}
            onClick={() => onChange(!checked)}
        >
            <span className="st-switch-knob" />
        </button>
    );
}

/**
 * Renders a dollar amount input that only accepts numbers.
 * @param {string} id The input id.
 * @param {string} label Name read out by screen readers.
 * @param {string} value The current amount.
 * @param {string} placeholder Hint text when empty.
 * @param {boolean} disabled True to grey the input out.
 * @param {boolean} invalid True to show the error border.
 * @param {Function} onChange Called with the cleaned amount.
 * @returns {JSX.Element} The price input.
 */
export function PriceInput({ id, label, value, placeholder = "", disabled = false, invalid = false, onChange }) {
    return (
        <label className={`st-price${invalid ? " has-error" : ""}${disabled ? " is-disabled" : ""}`} htmlFor={id}>
            <span aria-hidden="true">$</span>
            <input
                id={id}
                type="text"
                inputMode="decimal"
                aria-label={label}
                aria-invalid={invalid}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => onChange(cleanMoney(e.target.value))}
            />
        </label>
    );
}

/**
 * Renders the services and prices card with one row per service.
 * @param {Array} services The { id, name, enabled, price } services.
 * @param {Object} errors Error messages keyed by service id.
 * @param {Function} onChange Called with the updated services array.
 * @returns {JSX.Element} The services and prices card.
 */
export default function ServicePrices({ services, errors, onChange }) {
    function update(id, changes) {
        onChange(services.map((s) => (s.id === id ? { ...s, ...changes } : s)));
    }

    return (
        <section className="st-card" aria-labelledby="st-services-title">
            <div className="st-card-header">
                <span className="st-card-icon" aria-hidden="true"><Tag size={18} strokeWidth={1.75} /></span>
                <div>
                    <h2 id="st-services-title" className="st-card-title">Services &amp; prices</h2>
                    <p className="st-card-subtitle">Turn services on or off and set what each one costs</p>
                </div>
            </div>

            <ul className="st-rows">
                {services.map((service) => (
                    <li key={service.id} className="st-row">
                        <div className="st-row-left">
                            <Toggle
                                checked={service.enabled}
                                label={`Offer ${service.name}`}
                                onChange={(enabled) => update(service.id, { enabled })}
                            />
                            <span className={`st-row-label${service.enabled ? "" : " is-off"}`}>{service.name}</span>
                        </div>
                        <div className="st-row-right">
                            <PriceInput
                                id={`st-price-${service.id}`}
                                label={`${service.name} price`}
                                value={service.price}
                                placeholder="Set price"
                                disabled={!service.enabled}
                                invalid={Boolean(errors[service.id])}
                                onChange={(price) => update(service.id, { price })}
                            />
                            {errors[service.id] && <p className="st-error">{errors[service.id]}</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
