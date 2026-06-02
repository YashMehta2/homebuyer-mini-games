import React, { useState } from 'react';
import StackTheCloseGame from './StackTheCloseGame';
import StackTheCloseFinal from './StackTheCloseFinal';
import { closingCosts } from '../../data/closingCosts';
import Tooltip from '../shared/Tooltip';
import './StackTheClose.css';

function StackTheCloseStart({ onComplete, onBack }) {
  const [screen, setScreen] = useState("start");
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);

  const startGame = () => {
    // Shuffle items
    const shuffled = [...closingCosts].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setScreen("game");
  };

  const handleGameComplete = (results) => {
    setHistory(results);
    setScreen("final");
  };

  if (screen === "start") {
    return (
      <div className="stack-the-close-container fade-in">
        <a className="back-link" onClick={onBack}>← Back to Dashboard</a>
        <div className="card text-center">
          <h1>📋 Stack the Close</h1>
          <p className="description" style={{ marginTop: 16, marginBottom: 24 }}>
            <Tooltip>
              It is the final day to buy the house, and the bank gave you a giant list of fees! Your job is to sort each cost into the right bucket. Find out which fees are normal, which ones you can ask them to lower, and which ones are totally fake.
            </Tooltip>
          </p>
          
          <div className="how-to-play" style={{ textAlign: 'left', background: 'var(--bg)', padding: 24, borderRadius: 8, marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <strong>✅ Standard:</strong> Normal fees you always have to pay.
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>🤝 Negotiable:</strong> Fees you can argue about to get a lower price.
            </div>
            <div>
              <strong>🚩 Red Flag:</strong> Fake fees the bank tries to sneak in to steal your money!
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', fontSize: 18 }} onClick={startGame}>Start Sorting</button>
        </div>
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div className="stack-the-close-container fade-in">
        <StackTheCloseGame 
          items={items} 
          onComplete={handleGameComplete}
          onQuit={onBack}
        />
      </div>
    );
  }

  if (screen === "final") {
    const correctCount = history.filter(h => h.isCorrect).length;
    return (
      <div className="stack-the-close-container fade-in">
        <StackTheCloseFinal 
          history={history} 
          correctCount={correctCount}
          onComplete={() => onComplete(Math.round((correctCount / 15) * 33))}
        />
      </div>
    );
  }
}

export default StackTheCloseStart;
