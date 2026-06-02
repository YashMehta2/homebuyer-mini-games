import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import BidBattleStart from './components/BidBattle/BidBattleStart';
import RateRouletteStart from './components/RateRoulette/RateRouletteStart';
import StackTheCloseStart from './components/StackTheClose/StackTheCloseStart';

function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [gameScores, setGameScores] = useState({
    bidBattle: null,
    rateRoulette: null,
    stackTheClose: null
  });

  const handleGameComplete = (game, score) => {
    setGameScores(prev => ({
      ...prev,
      [game]: score
    }));
    setCurrentScreen("dashboard");
  };

  return (
    <div className="app-container">
      {currentScreen === "dashboard" && (
        <Dashboard 
          gameScores={gameScores} 
          onSelectGame={setCurrentScreen} 
        />
      )}
      {currentScreen === "bidBattle" && (
        <BidBattleStart 
          onComplete={(score) => handleGameComplete("bidBattle", score)}
          onBack={() => setCurrentScreen("dashboard")}
        />
      )}
      {currentScreen === "rateRoulette" && (
        <RateRouletteStart 
          onComplete={(score) => handleGameComplete("rateRoulette", score)}
          onBack={() => setCurrentScreen("dashboard")}
        />
      )}
      {currentScreen === "stackTheClose" && (
        <StackTheCloseStart 
          onComplete={(score) => handleGameComplete("stackTheClose", score)}
          onBack={() => setCurrentScreen("dashboard")}
        />
      )}
    </div>
  );
}

export default App;
