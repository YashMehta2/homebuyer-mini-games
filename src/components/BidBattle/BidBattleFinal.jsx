import React from 'react';
import Tooltip from '../shared/Tooltip';

function BidBattleFinal({ wins, history, onComplete }) {
  let heading = "";
  if (wins <= 1) heading = "Tough Market 😓";
  else if (wins <= 3) heading = "Solid Buyer 🏡";
  else heading = "Market Master 🏆";

  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="card fade-in text-center">
      <h1 style={{ marginBottom: 8 }}>{heading}</h1>
      <p style={{ fontSize: 20, color: 'var(--text-muted)', marginBottom: 32 }}>You won {wins} out of 5 homes.</p>

      <div className="summary-table">
        {history.map((h, i) => (
          <div key={i} className={`summary-row ${h.isWin ? 'win' : 'loss'}`}>
            <div className="sum-house">{h.house.name}</div>
            <div className="sum-status">{h.isWin ? 'Won' : 'Lost'}</div>
            <div className="sum-price">Winning bid: {formatMoney(h.winner.price)}</div>
          </div>
        ))}
      </div>

      <div className="learned-section" style={{ textAlign: 'left', marginTop: 32 }}>
        <h3>What You Learned</h3>
        <ul style={{ paddingLeft: 24, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <li><Tooltip>Sellers care about the whole offer, not just who offers the most money!</Tooltip></li>
          <li><Tooltip>Skipping safety rules (contingencies) makes the seller happy, but it is dangerous for you!</Tooltip></li>
          <li><Tooltip>Putting down more earnest money shows the seller you really want the house.</Tooltip></li>
          <li><Tooltip>Promising to buy the house faster makes your offer look much better.</Tooltip></li>
        </ul>
      </div>

      <div style={{ marginTop: 32, padding: 16, background: 'var(--primary-light)', borderRadius: 8, color: 'var(--primary)', fontWeight: 'bold' }}>
        Score Earned: {Math.round((wins / 5) * 33)} / 33
      </div>

      <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={onComplete}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default BidBattleFinal;
