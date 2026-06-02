import React, { useState } from 'react';
import Tooltip from '../shared/Tooltip';

function StackTheCloseGame({ items, onComplete, onQuit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const currentItem = items[currentIndex];

  const handleSelection = (category) => {
    if (feedback) return;

    const isCorrect = category === currentItem.correctCategory;
    const result = {
      ...currentItem,
      playerChoice: category,
      isCorrect
    };
    
    setResults([...results, result]);
    setFeedback({ isCorrect, explanation: currentItem.explanation, resultObj: result });
  };

  const handleNext = () => {
    const res = feedback.resultObj;
    setFeedback(null);
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete([...results, res]); // we use results from state which already has it appended, wait no we appended it. Actually setResults was called before, but the state variable `results` in this closure doesn't have it yet, so we must be careful or just use `results` + the new one. I appended it in handleSelection. But inside handleNext closure, `results` is not updated yet if it's the old closure. Wait, handleNext will run in a fresh render where `results` has the new item. Let's just use `results`. Actually, let's just pass `results` to onComplete.
    }
  };

  const executeComplete = () => {
    onComplete(results);
  };

  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="card game-screen text-center">
      <div className="status-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 18, fontWeight: 'bold', color: 'var(--text-muted)' }}>
        <span>{currentIndex + 1} of 15 items sorted</span>
        <button onClick={onQuit} className="btn-outline" style={{ padding: '6px 12px', fontSize: 14 }}>Quit Game</button>
      </div>

      <div className="fee-card">
        <h2 className="fee-name">{currentItem.name}</h2>
        <div className="fee-amount">{formatMoney(currentItem.amount)}</div>
        <p className="fee-desc">
          <Tooltip>{currentItem.description}</Tooltip>
        </p>
      </div>

      {feedback ? (
        <div className={`feedback-box fade-in ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-icon">{feedback.isCorrect ? '✅ Correct!' : '❌ Incorrect'}</div>
          <p style={{ marginBottom: 16 }}><Tooltip>{feedback.explanation}</Tooltip></p>
          <button className="btn-primary" style={{ width: '100%' }} onClick={currentIndex < items.length - 1 ? handleNext : executeComplete}>
            {currentIndex < items.length - 1 ? 'Next →' : 'See Results'}
          </button>
        </div>
      ) : (
        <div className="category-buttons">
          <button className="cat-btn cat-standard" onClick={() => handleSelection('Standard')}>
            ✅ Standard
          </button>
          <button className="cat-btn cat-negotiable" onClick={() => handleSelection('Negotiable')}>
            🤝 Negotiable
          </button>
          <button className="cat-btn cat-redflag" onClick={() => handleSelection('Red Flag')}>
            🚩 Red Flag
          </button>
        </div>
      )}
    </div>
  );
}

export default StackTheCloseGame;
