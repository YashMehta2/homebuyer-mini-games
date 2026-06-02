export function generateRates(baseRate, days = 30) {
  // Randomize the start rate by up to ±0.25%
  const startRate = baseRate + (Math.random() * 0.5 - 0.25);
  
  const rates = [Math.round(startRate * 100) / 100];
  let currentRate = startRate;
  
  for (let i = 1; i < days; i++) {
    // Increased volatility: change up to ±0.20%, slight upward bias
    const change = (Math.random() * 0.4) - 0.20 + 0.01;
    currentRate += change;
    
    // Clamp to ±1.5% of base rate
    currentRate = Math.max(baseRate - 1.5, Math.min(baseRate + 1.5, currentRate));
    rates.push(Math.round(currentRate * 100) / 100);
  }
  return rates;
}
