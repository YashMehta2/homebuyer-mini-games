export function calculateMonthlyPayment(principal, ratePercent, years) {
  if (ratePercent === 0) return principal / (years * 12);
  const r = (ratePercent / 100) / 12;
  const n = years * 12;
  const payment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return payment;
}
