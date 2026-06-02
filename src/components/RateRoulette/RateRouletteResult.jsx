import React from 'react';
import { calculateMonthlyPayment } from '../../utils/mortgageCalc';
import PhaserConfetti from '../phaser/PhaserConfetti';

function RateRouletteResult({ scenario, rates, lockedDay, lockedRate, onNext }) {
  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const bestDay = rates.indexOf(minRate) + 1;
  const worstDay = rates.indexOf(maxRate) + 1;
  
  const diff = lockedRate - minRate;
  let scoreType = "Needs Work 📚";
  if (diff <= 0.2) scoreType = "Excellent 🎯";
  else if (diff <= 0.5) scoreType = "Good 👍";

  const lockedPayment = calculateMonthlyPayment(scenario.amount, lockedRate, scenario.term);
  const bestPayment = calculateMonthlyPayment(scenario.amount, minRate, scenario.term);
  const worstPayment = calculateMonthlyPayment(scenario.amount, maxRate, scenario.term);

  const n = scenario.term * 12;
  const lockedTotal = lockedPayment * n;
  const bestTotal = bestPayment * n;
  const worstTotal = worstPayment * n;

  const handleNext = () => {
    onNext({
      scenario,
      lockedRate,
      lockedDay,
      lockedPayment,
      lockedTotal,
      scoreType,
      bestTotal
    });
  };

  return (
    <div className="card fade-in text-center">
      <PhaserConfetti trigger={scoreType.includes("Excellent")} />
      {lockedDay === 30 && <div className="warning-banner">You ran out of time! The rate was auto-locked on the last day.</div>}
      <h2>You locked at {lockedRate.toFixed(2)}% on Day {lockedDay}</h2>
      
      <div className="score-badge">{scoreType}</div>

      <div className="impact-summary">
        <div className="impact-row">
          <span>Monthly Payment:</span>
          <strong>{formatMoney(lockedPayment)}</strong>
        </div>
        <div className="impact-row">
          <span>Total Cost:</span>
          <strong>{formatMoney(lockedTotal)}</strong>
        </div>
      </div>

      <div className="comparison-box">
        <div className="comp-best">
          <h4>Best Rate: {minRate.toFixed(2)}% (Day {bestDay})</h4>
          {lockedTotal === bestTotal ? 
            "You got the best possible rate!" : 
            `Would have saved ${formatMoney(lockedTotal - bestTotal)}`
          }
        </div>
        <div className="comp-worst">
          <h4>Worst Rate: {maxRate.toFixed(2)}% (Day {worstDay})</h4>
          Would have cost {formatMoney(worstTotal - lockedTotal)} more
        </div>
      </div>

      <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={handleNext}>Next Scenario →</button>
    </div>
  );
}

export default RateRouletteResult;
