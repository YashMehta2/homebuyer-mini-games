import React from 'react';
import ProgressRing from '../shared/ProgressRing';
import PhaserConfetti from '../phaser/PhaserConfetti';
import PhaserHouseScene from '../phaser/PhaserHouseScene';
import './Dashboard.css';

function Dashboard({ gameScores, onSelectGame }) {
  const calculateTotalScore = () => {
    let total = 0;
    if (gameScores.bidBattle !== null) total += gameScores.bidBattle;
    if (gameScores.rateRoulette !== null) total += gameScores.rateRoulette;
    if (gameScores.stackTheClose !== null) total += gameScores.stackTheClose;
    return Math.round(total);
  };

  const games = [
    {
      id: 'bidBattle',
      title: 'Bid Battle',
      emoji: '🏷️',
      desc: 'Try to buy a house! Learn how to make a winning offer without just throwing all your money at it.',
      teaches: 'Offers, Earnest Money, Contingencies'
    },
    {
      id: 'rateRoulette',
      title: 'Rate Roulette',
      emoji: '📈',
      desc: 'Pick the best day to lock your loan rate. See how tiny changes can cost you thousands of extra dollars!',
      teaches: 'Mortgage Rates, Rate Locks, Monthly Payments'
    },
    {
      id: 'stackTheClose',
      title: 'Stack the Close',
      emoji: '📋',
      desc: 'Sort out the final extra costs. Find out which fees are normal, which you can argue, and which are fake!',
      teaches: 'Closing Costs, Fees, Negotiation'
    }
  ];

  return (
    <div className="dashboard fade-in">
      <PhaserConfetti trigger={calculateTotalScore() >= 80} />
      <PhaserHouseScene completedGames={{
        bidBattle: gameScores.bidBattle > 0,
        rateRoulette: gameScores.rateRoulette > 0,
        stackTheClose: gameScores.stackTheClose > 0
      }} />
      <header className="dashboard-header">
        <h1>🏠 Nest Navigate</h1>
        <h2>Learn the homebuying journey — one game at a time</h2>
      </header>

      <section className="score-section">
        <div className="card score-card">
          <h3>Homebuyer Readiness Score</h3>
          <ProgressRing score={calculateTotalScore()} />
        </div>
      </section>

      <section className="games-grid">
        {games.map(game => (
          <div key={game.id} className="card game-card">
            <div className="game-card-header">
              <span className="game-emoji">{game.emoji}</span>
              <h3>{game.title}</h3>
            </div>
            <p className="game-desc">{game.desc}</p>
            <div className="game-teaches">
              <strong>Teaches:</strong> {game.teaches}
            </div>
            
            <div className="game-status">
              {gameScores[game.id] !== null ? (
                <span className="badge badge-complete">Completed ✓ ({gameScores[game.id]} pts)</span>
              ) : (
                <span className="badge badge-pending">Not Started</span>
              )}
            </div>

            <button className="btn-primary game-btn" onClick={() => onSelectGame(game.id)}>
              {gameScores[game.id] !== null ? 'Play Again' : 'Play'}
            </button>
          </div>
        ))}
      </section>

      <footer className="dashboard-footer">
        Built for first-time homebuyers 💙
      </footer>
    </div>
  );
}

export default Dashboard;
