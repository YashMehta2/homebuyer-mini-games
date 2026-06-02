import React from 'react';
import Tooltip from '../shared/Tooltip';

function StackTheCloseFinal({ history, correctCount, onComplete }) {
  let heading = "Hit the Books! 📖";
  if (correctCount >= 13) heading = "Closing Cost Pro! 🏆";
  else if (correctCount >= 9) heading = "Getting There! 📚";

  const renderCategoryList = (categoryTitle, targetCategory) => {
    const filtered = history.filter(h => h.correctCategory === targetCategory);
    if (filtered.length === 0) return null;

    return (
      <div className="review-category">
        <h3>{categoryTitle}</h3>
        {filtered.map(h => (
          <div key={h.id} className="review-item">
            <div className="review-header">
              <strong>{h.name}</strong>
              <span className={`review-badge ${h.isCorrect ? 'correct' : 'incorrect'}`}>
                {h.isCorrect ? '✅ You got it right' : `❌ You picked ${h.playerChoice}`}
              </span>
            </div>
            <p className="review-exp"><Tooltip>{h.explanation}</Tooltip></p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card fade-in text-center">
      <h1 style={{ marginBottom: 8 }}>{correctCount} / 15 Correct</h1>
      <div className="score-badge" style={{ marginBottom: 32 }}>{heading}</div>

      <div className="review-section" style={{ textAlign: 'left', marginBottom: 32 }}>
        {renderCategoryList('✅ Standard Costs', 'Standard')}
        {renderCategoryList('🤝 Negotiable Costs', 'Negotiable')}
        {renderCategoryList('🚩 Red Flag Costs', 'Red Flag')}
      </div>

      <div className="learned-section" style={{ textAlign: 'left', marginBottom: 32 }}>
        <h3>What You Learned</h3>
        <ul style={{ paddingLeft: 24, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <li><Tooltip>Closing costs are extra fees that make buying a house slightly more expensive than just the sticker price.</Tooltip></li>
          <li><Tooltip>Not every fee is final! You can argue with the bank to lower some of them.</Tooltip></li>
          <li><Tooltip>Fake fees usually have boring names like 'admin fee'. Always ask what they actually do!</Tooltip></li>
          <li><Tooltip>Calling different companies to find the best price on services can save you lots of money.</Tooltip></li>
        </ul>
      </div>

      <button className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 18 }} onClick={onComplete}>Back to Dashboard</button>
    </div>
  );
}

export default StackTheCloseFinal;
