import React from 'react';

function BidBattleResult({ result, onNext, isLast }) {
  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const getReasoning = (winner) => {
    let waived = [];
    if (!winner.inspection) waived.push("inspection");
    if (!winner.appraisal) waived.push("appraisal");
    if (!winner.financing) waived.push("financing");
    
    let contText = waived.length > 0 ? `waived ${waived.join(' and ')}` : "kept all contingencies";
    return `The seller chose ${winner.name} due to the price of ${formatMoney(winner.price)}, ${contText}, and a ${winner.timeline}-day close.`;
  };

  return (
    <div className="card fade-in result-modal">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Round Results</h2>
      
      <div className="reasoning">
        {getReasoning(result.winner)}
      </div>

      <div className="comparison-grid">
        {result.offers.map((offer, idx) => (
          <div key={idx} className={`offer-col ${offer.name === result.winner.name ? 'winner' : ''}`}>
            {offer.name === result.winner.name && <div className="winner-badge">🏆 Winner</div>}
            <h4>{offer.name}</h4>
            <div className="comp-price">{formatMoney(offer.price)}</div>
            <ul>
              <li>{offer.earnest}% Earnest</li>
              <li>{offer.timeline} Days</li>
              <li>Insp: {offer.inspection ? 'Yes' : 'Waived'}</li>
              <li>Appr: {offer.appraisal ? 'Yes' : 'Waived'}</li>
              <li>Fin: {offer.financing ? 'Yes' : 'Waived'}</li>
            </ul>
          </div>
        ))}
      </div>

      <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={onNext}>
        {isLast ? "See Final Results" : "Next Round →"}
      </button>
    </div>
  );
}

export default BidBattleResult;
