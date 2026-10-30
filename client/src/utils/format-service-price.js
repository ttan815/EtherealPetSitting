// "$25 / visit", or "$— / day" while the price is a placeholder (startingPrice is null)
export function formatServicePrice(service) {
  const amount = service.startingPrice ?? "—";
  return `$${amount} / ${service.priceUnit}`;
}
