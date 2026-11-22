export function formatPrice(amount: number): string {
  return `NOK ${amount.toLocaleString("nb-NO")}`;
}
