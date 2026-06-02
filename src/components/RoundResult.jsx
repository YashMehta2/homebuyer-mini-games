import React from 'react';

function RoundResult({ result, onNext, isLastRound }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const getSellerReasoning = (winningOffer) => {
    const parts = [];
    parts.push(`price of ${formatCurrency(winningOffer.price)}`);
    
    const waived = [];
    if (!winningOffer.inspection) waived.push('inspection');
    if (!winningOffer.appraisal) waived.push('appraisal');
    if (!winningOffer.financing) waived.push('financing');

    if (waived.length > 0) {
      parts.push(`waived ${waived.join(' and ')}`);
    } else {
      parts.push('kept all contingencies');
    }

    parts.push(`a ${winningOffer.timeline} day close`);
    
    return `The seller chose ${winningOffer.name}'s offer because of the ${parts.join(', ')}.`;
  };

  return (
    <div className="round-result">
      <h3>Round Results</h3>
      <p className="seller-reasoning">{getSellerReasoning(result.winningOffer)}</p>
      
      <div className="offers-comparison">
        {result.offers.map((offer, idx) => (
          <div key={idx} className={`offer-card ${offer.name === result.winningOffer.name ? 'winner' : ''}`}>
            <h4>{offer.name}</h4>
            <p className="offer-price">{formatCurrency(offer.price)}</p>
            <ul className="offer-details-list">
              <li>{offer.earnest}% Earnest</li>
              <li>{offer.timeline} Days to Close</li>
              <li>Inspection: {offer.inspection ? 'Yes' : 'Waived'}</li>
              <li>Appraisal: {offer.appraisal ? 'Yes' : 'Waived'}</li>
              <li>Financing: {offer.financing ? 'Yes' : 'Waived'}</li>
            </ul>
            {offer.name === result.winningOffer.name && <div className="winner-badge">Winner</div>}
          </div>
        ))}
      </div>

      <button className="next-btn" onClick={onNext}>
        {isLastRound ? 'See Final Results →' : 'Next Round →'}
      </button>
    </div>
  );
}

export default RoundResult;
