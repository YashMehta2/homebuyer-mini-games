import React from 'react';

function FinalResults({ wins, history, onPlayAgain }) {
  let heading = "";
  let message = "";
  
  if (wins <= 1) {
    heading = "Tough Market! 😓";
    message = "The housing market is competitive. Here's what you learned...";
  } else if (wins <= 3) {
    heading = "Nice Work! 🏡";
    message = "You're getting the hang of this!";
  } else {
    heading = "Market Master! 🏆";
    message = "You really know how to compete!";
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="final-results">
      <h1>{heading}</h1>
      <p className="result-message">{message}</p>
      
      <div className="summary-section">
        <h3>Round Summary</h3>
        <div className="summary-list">
          {history.map((res, idx) => (
            <div key={idx} className={`summary-item ${res.isPlayerWin ? 'win' : 'loss'}`}>
              <span className="summary-house">{res.house.name}</span>
              <span className="summary-outcome">{res.isPlayerWin ? 'Won' : 'Lost'}</span>
              <span className="summary-winning-price">Winning bid: {formatCurrency(res.winningOffer.price)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="takeaways-section">
        <h3>Key Takeaways</h3>
        <ul>
          <li>Sellers don't just look at the highest price — the full package matters.</li>
          <li>Waiving contingencies can make your offer stronger, but increases your risk.</li>
          <li>Earnest money shows the seller you're serious.</li>
          <li>A faster closing timeline can give you an edge.</li>
        </ul>
      </div>

      <button className="primary-btn" onClick={onPlayAgain}>Play Again</button>
    </div>
  );
}

export default FinalResults;
