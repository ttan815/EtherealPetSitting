// "$25", or "$—" while the price is a placeholder (startingPrice is null)
/**
 * Formats a service's starting price, including its placeholder value.
 * @param {{startingPrice: number|null}} service - The service whose starting price to format.
 * @returns {string} The starting amount prefixed with a dollar sign.
 */
export function formatStartingAmount(service) {
  return `$${service.startingPrice ?? "—"}`;
}

// "$25 / visit", or "$— / day"
/**
 * Formats a service's starting price together with its billing unit.
 * @param {{startingPrice: number|null, priceUnit: string}} service - The service to format.
 * @returns {string} The starting amount and price unit.
 */
export function formatServicePrice(service) {
  return `${formatStartingAmount(service)} / ${service.priceUnit}`;
}
