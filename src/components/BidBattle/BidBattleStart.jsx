import React, { useState } from 'react';
import BidBattleGame from './BidBattleGame';
import BidBattleFinal from './BidBattleFinal';
import { houses } from '../../data/houses';
import { scoreOffer } from '../../utils/scoring';
import { generateAIOffer } from '../../utils/aiOpponent';
import Tooltip from '../shared/Tooltip';
import './BidBattle.css';

function BidBattleStart({ onComplete, onBack }) {
  const [screen, setScreen] = useState("start");
  const [round, setRound] = useState(0);
  const [wins, setWins] = useState(0);
  const [history, setHistory] = useState([]);

  const startGame = () => setScreen("game");

  const handleOfferSubmit = (playerOffer) => {
    const house = houses[round];
    const ai1 = { ...generateAIOffer(house.price), name: "Buyer A" };
    const ai2 = { ...generateAIOffer(house.price), name: "Buyer B" };
    const player = { ...playerOffer, name: "You" };

    const offers = [player, ai1, ai2];
    offers.forEach(o => o.score = scoreOffer(o, house.price));
    offers.sort((a, b) => b.score === a.score ? b.price - a.price : b.score - a.score);

    const winner = offers[0];
    const isWin = winner.name === "You";
    if (isWin) setWins(wins + 1);

    setHistory([...history, { house, offers, winner, isWin }]);
    setRound(round + 1);
    
    if (round === 4) {
      setScreen("final");
    }
  };

  if (screen === "start") {
    return (
      <div className="bid-battle-container fade-in">
        <a className="back-link" onClick={onBack}>← Back to Dashboard</a>
        <div className="card text-center">
          <h1>🏷️ Bid Battle</h1>
          <p className="description" style={{ marginTop: 16, marginBottom: 24 }}>
            <Tooltip>
              You are trying to buy your first house, but two other people want to buy it too! You need to make the best offer to win. But remember: the person selling the house cares about more than just the money!
            </Tooltip>
          </p>
          <div className="how-to-play" style={{ textAlign: 'left', background: 'var(--bg)', padding: 24, borderRadius: 8, marginBottom: 24 }}>
            <h3 style={{ marginBottom: 12 }}>How to Win</h3>
            <ul style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>Offer Price:</strong> Offering more money is good, but don't spend too much!</li>
              <li><strong>Earnest Money:</strong> Putting down more cash right away proves you are serious.</li>
              <li><strong>Contingencies:</strong> Dropping safety rules makes your offer stronger, but it's risky for you!</li>
              <li><strong>Closing Timeline:</strong> Sellers love it when you can finish buying the house super fast.</li>
            </ul>
          </div>
          <button className="btn-primary" style={{ width: '100%', fontSize: 18 }} onClick={startGame}>Start Game</button>
        </div>
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div className="bid-battle-container fade-in">
        <BidBattleGame 
          round={round} 
          house={houses[round]} 
          wins={wins} 
          onSubmit={handleOfferSubmit}
          history={history}
        />
      </div>
    );
  }

  if (screen === "final") {
    return (
      <div className="bid-battle-container fade-in">
        <BidBattleFinal 
          wins={wins} 
          history={history} 
          onComplete={() => onComplete(Math.round((wins / 5) * 33))}
        />
      </div>
    );
  }
}

export default BidBattleStart;
