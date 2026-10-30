// "$25", or "$—" while the price is a placeholder (startingPrice is null)
export function formatStartingAmount(service) {
  return `$${service.startingPrice ?? "—"}`;
}

// "$25 / visit", or "$— / day"
export function formatServicePrice(service) {
  return `${formatStartingAmount(service)} / ${service.priceUnit}`;
}
