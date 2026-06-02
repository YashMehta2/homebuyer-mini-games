import React from 'react';
import HouseCard from './HouseCard';
import OfferBuilder from './OfferBuilder';
import RoundResult from './RoundResult';

function GameRound({ roundNumber, house, wins, onSubmitOffer, onNextRound, history }) {
  const currentResult = history[roundNumber];

  return (
    <div className="game-round">
      <div className="game-header">
        <span className="round-indicator">Round {roundNumber + 1} of 5</span>
        <span className="wins-indicator">Wins: {wins}</span>
      </div>
      
      <div className="game-content">
        <HouseCard house={house} />
        
        {!currentResult ? (
          <OfferBuilder house={house} onSubmit={onSubmitOffer} />
        ) : (
          <RoundResult 
            result={currentResult} 
            onNext={onNextRound} 
            isLastRound={roundNumber === 4} 
          />
        )}
      </div>
    </div>
  );
}

export default GameRound;
