import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';

function OfferBuilder({ house, onSubmit }) {
  const [price, setPrice] = useState(house.price);
  const [earnest, setEarnest] = useState(1);
  const [inspection, setInspection] = useState(true);
  const [appraisal, setAppraisal] = useState(true);
  const [financing, setFinancing] = useState(true);
  const [timeline, setTimeline] = useState(45);

  useEffect(() => {
    setPrice(house.price);
    setEarnest(1);
    setInspection(true);
    setAppraisal(true);
    setFinancing(true);
    setTimeline(45);
  }, [house]);

  const minPrice = Math.round(house.price * 0.90);
  const maxPrice = Math.round(house.price * 1.15);

  const handleSubmit = () => {
    onSubmit({
      price,
      earnest,
      inspection,
      appraisal,
      financing,
      timeline
    });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="offer-builder">
      <h3>Build Your Offer</h3>
      
      <div className="offer-section">
        <label>
          Offer Price: <span className="highlight-value">{formatCurrency(price)}</span>
        </label>
        <input 
          type="range" 
          min={minPrice} 
          max={maxPrice} 
          step="1000" 
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))} 
        />
      </div>

      <div className="offer-section">
        <label>
          <Tooltip text="earnest money">Earnest Money Deposit</Tooltip>
        </label>
        <div className="button-group">
          {[1, 2, 3].map(percent => (
            <button 
              key={percent}
              className={`toggle-btn ${earnest === percent ? 'active' : ''}`}
              onClick={() => setEarnest(percent)}
            >
              {percent}% ({formatCurrency(price * (percent / 100))})
            </button>
          ))}
        </div>
      </div>

      <div className="offer-section">
        <label><Tooltip text="contingency">Contingencies</Tooltip></label>
        <div className="contingency-list">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={inspection} 
              onChange={(e) => setInspection(e.target.checked)} 
            />
            <Tooltip text="inspection">Inspection Contingency</Tooltip>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={appraisal} 
              onChange={(e) => setAppraisal(e.target.checked)} 
            />
            <Tooltip text="appraisal">Appraisal Contingency</Tooltip>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={financing} 
              onChange={(e) => setFinancing(e.target.checked)} 
            />
            <Tooltip text="financing">Financing Contingency</Tooltip>
          </label>
        </div>
      </div>

      <div className="offer-section">
        <label>
          <Tooltip text="closing timeline">Closing Timeline</Tooltip>
        </label>
        <div className="button-group">
          {[45, 30, 21].map(days => (
            <button 
              key={days}
              className={`toggle-btn ${timeline === days ? 'active' : ''}`}
              onClick={() => setTimeline(days)}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Submit Offer &rarr;</button>
    </div>
  );
}

export default OfferBuilder;
