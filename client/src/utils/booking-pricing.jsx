import { fromDateKey, getToday } from "./calendar-dates";

/**
 * Calculates the service total and the deposit tier for a booking.
 * @param {Array<{startingPrice: number|null}>} services - The selected services.
 * @param {string|null} dateKey - The selected appointment date.
 * @returns {{total: number|null, deposit: number, balance: number|null}} The booking price breakdown.
 */
export function getBookingPrice(services, dateKey) {
  const total = services.length === 0 || services.some((service) => service.startingPrice === null)
    ? null
    : services.reduce((sum, service) => sum + service.startingPrice, 0);

  let deposit = 0;
  if (dateKey) {
    const appointmentDate = fromDateKey(dateKey);
    const daysAhead = Math.round((appointmentDate - getToday()) / 86400000);
    deposit = daysAhead <= 30 ? 20 : daysAhead <= 60 ? 50 : 100;
  }

  return {
    total,
    deposit,
    balance: total === null ? null : Math.max(total - deposit, 0),
  };
}

/**
 * Formats a dollar amount or a quote-required placeholder.
 * @param {number|null} amount - The amount in dollars.
 * @returns {string} A currency-formatted amount or quote message.
 */
export function formatBookingAmount(amount) {
  return amount === null ? "Quote required" : `$${amount.toFixed(2)}`;
}
