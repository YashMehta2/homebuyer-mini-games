import React from 'react';

function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="hero-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <h1>Bid Battle</h1>
      <h2>Win Your Dream Home</h2>
      <p className="description">
        You're a first-time homebuyer entering a competitive market. Compete against other buyers by crafting smart offers. Learn what sellers really care about — it's not just about price.
      </p>
      
      <div className="how-to-play">
        <h3>How to Play</h3>
        <ul>
          <li><strong>Offer Price:</strong> Higher price increases your chances, but watch your budget.</li>
          <li><strong>Earnest Money:</strong> Larger deposit shows you are serious.</li>
          <li><strong>Contingencies:</strong> Waiving them makes your offer stronger but increases your risk.</li>
          <li><strong>Closing Timeline:</strong> Sellers usually prefer a faster close.</li>
        </ul>
      </div>

      <button className="primary-btn" onClick={onStart}>Start Game</button>
    </div>
  );
}

export default StartScreen;
