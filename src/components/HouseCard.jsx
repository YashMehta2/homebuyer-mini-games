import React from 'react';
import Tooltip from './Tooltip';

function HouseCard({ house }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="house-card">
      <div className="house-icon-container">
        {house.image ? (
          <img src={house.image} alt={house.name} className="house-image" />
        ) : (
          <div className="house-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        )}
      </div>
      <div className="house-details">
        <h2>{house.name}</h2>
        <p className="house-price">
          <Tooltip text="listing price">{formatCurrency(house.price)}</Tooltip>
        </p>
        <p className="house-specs">
          {house.beds} Beds &bull; {house.baths} Baths &bull; {house.sqft} sqft
        </p>
        <p className="house-description">{house.description}</p>
      </div>
    </div>
  );
}

export default HouseCard;
