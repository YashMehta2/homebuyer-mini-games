import React, { useState } from 'react';
import RateRouletteGame from './RateRouletteGame';
import RateRouletteFinal from './RateRouletteFinal';
import { loanScenarios } from '../../data/loanScenarios';
import { generateRates } from '../../utils/rateGenerator';
import Tooltip from '../shared/Tooltip';
import './RateRoulette.css';

function RateRouletteStart({ onComplete, onBack }) {
  const [screen, setScreen] = useState("start");
  const [round, setRound] = useState(0);
  const [history, setHistory] = useState([]);
  const [ratesData, setRatesData] = useState([]);

  const startGame = () => {
    setRatesData(loanScenarios.map(s => generateRates(s.startingRate, 30)));
    setScreen("game");
  };

  const handleScenarioComplete = (result) => {
    const newHistory = [...history, result];
    setHistory(newHistory);
    setRound(round + 1);
    if (round === 2) {
      setScreen("final");
    }
  };

  if (screen === "start") {
    return (
      <div className="rate-roulette-container fade-in">
        <a className="back-link" onClick={onBack}>← Back to Dashboard</a>
        <div className="card text-center">
          <h1>📈 Rate Roulette</h1>
          <p className="description" style={{ marginTop: 16, marginBottom: 32 }}>
            <Tooltip>
              Interest rates jump up and down every single day! In this game, you have 30 days to lock in a rate. You can lock your rate right now, or wait and see if it drops tomorrow. But be careful—if you wait, the rate might go up and cost you thousands of extra dollars!
            </Tooltip>
          </p>
          <div className="how-to-play" style={{ textAlign: 'left', background: 'var(--bg)', padding: 24, borderRadius: 8, marginBottom: 24 }}>
            <h3 style={{ marginBottom: 12 }}>How it Works</h3>
            <p>You'll shop for a rate across 3 different loan scenarios. Each day you can LOCK or WAIT.</p>
          </div>
          <button className="btn-primary" style={{ width: '100%', fontSize: 18 }} onClick={startGame}>Start Game</button>
        </div>
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div className="rate-roulette-container fade-in">
        <RateRouletteGame 
          key={round}
          round={round} 
          scenario={loanScenarios[round]} 
          rates={ratesData[round]}
          onComplete={handleScenarioComplete}
        />
      </div>
    );
  }

  if (screen === "final") {
    const excellentCount = history.filter(h => h.scoreType === "Excellent 🎯").length;
    let score = 8;
    if (excellentCount === 3) score = 33;
    else if (excellentCount === 2) score = 26;
    else if (excellentCount === 1) score = 18;

    return (
      <div className="rate-roulette-container fade-in">
        <RateRouletteFinal 
          history={history} 
          onComplete={() => onComplete(score)}
        />
      </div>
    );
  }
}

export default RateRouletteStart;
