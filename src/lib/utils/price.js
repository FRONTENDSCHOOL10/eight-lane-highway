export function formatPrice(price) {
  const roundedPrice = Math.floor(price / 10) * 10;
  return roundedPrice.toLocaleString();
}
