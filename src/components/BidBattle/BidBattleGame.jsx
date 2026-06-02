import React, { useState } from 'react';
import BidBattleResult from './BidBattleResult';
import Tooltip from '../shared/Tooltip';

function BidBattleGame({ round, house, wins, onSubmit, history }) {
  const [price, setPrice] = useState(house.price);
  const [earnest, setEarnest] = useState(1);
  const [inspection, setInspection] = useState(true);
  const [appraisal, setAppraisal] = useState(true);
  const [financing, setFinancing] = useState(true);
  const [timeline, setTimeline] = useState(45);
  
  const [showResult, setShowResult] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const prevResult = round > 0 && history.length === round ? history[round - 1] : null;

  const handleSubmit = () => {
    onSubmit({ price, earnest, inspection, appraisal, financing, timeline });
  };

  const handleNextImage = () => {
    if (house.images && house.images.length > 0) {
      setImageIndex((imageIndex + 1) % house.images.length);
    }
  };

  const handlePrevImage = () => {
    if (house.images && house.images.length > 0) {
      setImageIndex((imageIndex - 1 + house.images.length) % house.images.length);
    }
  };

  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  if (prevResult && !showResult) {
    return <BidBattleResult result={prevResult} onNext={() => {
      setShowResult(true);
      setPrice(house.price);
      setEarnest(1);
      setInspection(true);
      setAppraisal(true);
      setFinancing(true);
      setTimeline(45);
      setImageIndex(0);
    }} isLast={round === 5} />;
  }

  return (
    <div className="game-screen fade-in">
      <div className="status-bar">
        <span>Round {round + 1} of 5</span>
        <span>Wins: {wins}</span>
      </div>

      <div className="card house-card">
        <div className="house-image-carousel">
          {house.images && house.images.length > 0 ? (
            <>
              <img src={house.images[imageIndex]} alt={house.name} className="house-image" />
              {house.images.length > 1 && (
                <div className="carousel-controls">
                  <button onClick={handlePrevImage} className="carousel-btn">❮</button>
                  <div className="carousel-dots">
                    {house.images.map((_, i) => (
                      <span key={i} className={`dot ${i === imageIndex ? 'active' : ''}`} />
                    ))}
                  </div>
                  <button onClick={handleNextImage} className="carousel-btn">❯</button>
                </div>
              )}
            </>
          ) : (
            <div className="house-icon">🏠</div>
          )}
        </div>
        <div className="house-info">
          <h2>{house.name}</h2>
          <div className="house-price">{formatMoney(house.price)}</div>
          <div className="house-details">{house.beds}bd • {house.baths}ba • {house.sqft} sqft</div>
          <div className="house-desc">{house.description}</div>
        </div>
      </div>

      <div className="card offer-builder">
        <h3>Craft Your Offer</h3>

        <div className="builder-row">
          <label>Offer Price: <span className="live-value">{formatMoney(price)}</span></label>
          <input 
            type="range" 
            min={house.price * 0.9} 
            max={house.price * 1.15} 
            step={1000} 
            value={price} 
            onChange={e => setPrice(Number(e.target.value))} 
          />
        </div>

        <div className="builder-row">
          <label><Tooltip>Earnest Money</Tooltip></label>
          <div className="btn-group">
            {[1, 2, 3].map(pct => (
              <button 
                key={pct} 
                className={`group-btn ${earnest === pct ? 'active' : ''}`}
                onClick={() => setEarnest(pct)}
              >
                {pct}%<br/><small>{formatMoney(price * (pct/100))}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="builder-row">
          <label><Tooltip>Contingencies</Tooltip></label>
          <div className="toggles">
            <label className="toggle">
              <input type="checkbox" checked={inspection} onChange={e => setInspection(e.target.checked)} style={{ margin: 0, marginRight: '8px', width: '18px', height: '18px' }} />
              <Tooltip>Inspection</Tooltip>
            </label>
            <label className="toggle">
              <input type="checkbox" checked={appraisal} onChange={e => setAppraisal(e.target.checked)} style={{ margin: 0, marginRight: '8px', width: '18px', height: '18px' }} />
              <Tooltip>Appraisal</Tooltip>
            </label>
            <label className="toggle">
              <input type="checkbox" checked={financing} onChange={e => setFinancing(e.target.checked)} style={{ margin: 0, marginRight: '8px', width: '18px', height: '18px' }} />
              <Tooltip>Financing</Tooltip>
            </label>
          </div>
        </div>

        <div className="builder-row">
          <label><Tooltip>Closing Timeline</Tooltip></label>
          <div className="btn-group">
            {[45, 30, 21].map(days => (
              <button 
                key={days} 
                className={`group-btn ${timeline === days ? 'active' : ''}`}
                onClick={() => setTimeline(days)}
              >
                {days} days
              </button>
            ))}
          </div>
        </div>

        <button className="btn-accent submit-offer" onClick={() => {
          setShowResult(false);
          handleSubmit();
        }}>Submit Offer</button>
      </div>
    </div>
  );
}

export default BidBattleGame;
