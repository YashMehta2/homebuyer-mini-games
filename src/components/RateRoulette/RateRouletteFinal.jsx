import React from 'react';
import Tooltip from '../shared/Tooltip';

function RateRouletteFinal({ history, onComplete }) {
  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  let totalLeftOnTable = 0;
  history.forEach(h => totalLeftOnTable += (h.lockedTotal - h.bestTotal));

  return (
    <div className="card fade-in text-center">
      <h1 style={{ marginBottom: 16 }}>Rate Roulette Complete</h1>
      
      <div className="history-list">
        {history.map((h, i) => (
          <div key={i} className="history-item">
            <div className="hist-title">Scenario {i+1} ({formatMoney(h.scenario.amount)})</div>
            <div className="hist-stats">
              Locked {h.lockedRate.toFixed(2)}% (Day {h.lockedDay}) • {h.scoreType}
            </div>
          </div>
        ))}
      </div>

      <div className="total-impact" style={{ margin: '24px 0', padding: 24, background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 12 }}>
        <h2 style={{ color: '#fbbf24', marginBottom: 12 }}>Total Money "Left on the Table": {formatMoney(totalLeftOnTable)}</h2>
        <p style={{ color: '#fcd34d', fontSize: 15, lineHeight: 1.5, textAlign: 'left' }}>
          <strong>What does this mean?</strong> This is the total extra interest you would pay across all 3 scenarios because you didn't time the market perfectly. For example, if you lock a rate that ends up costing $5,000 more than the absolute best rate that month, you left $5,000 "on the table".
        </p>
      </div>

      <div className="learned-section" style={{ textAlign: 'left' }}>
        <h3>What You Learned</h3>
        <ul style={{ paddingLeft: 24, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <li><Tooltip>Interest rates jump up and down every single day! Even tiny changes matter a lot over 30 years.</Tooltip></li>
          <li><Tooltip>If your rate goes up by just half a percent on a big loan, it will cost you tens of thousands of extra dollars in the long run.</Tooltip></li>
          <li><Tooltip>Locking your rate means you don't have to stress anymore. Peace of mind is valuable!</Tooltip></li>
          <li><Tooltip>Trying to guess the absolute perfect day to lock your rate is basically impossible.</Tooltip></li>
        </ul>
      </div>

      <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={onComplete}>Back to Dashboard</button>
    </div>
  );
}

export default RateRouletteFinal;
