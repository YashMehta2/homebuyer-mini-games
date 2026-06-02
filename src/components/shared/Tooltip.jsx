import React, { useState } from 'react';
import { glossary } from '../../data/glossary';
import './Tooltip.css';

function Tooltip({ children }) {
  const [activeTerm, setActiveTerm] = useState(null);

  const renderContent = () => {
    if (typeof children !== 'string') return children;
    
    let result = [children];
    Object.keys(glossary).forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      result = result.flatMap(part => {
        if (typeof part !== 'string') return part;
        const pieces = part.split(regex);
        return pieces.map((piece, i) => {
          if (piece.toLowerCase() === term) {
            return (
              <span 
                key={`${term}-${i}`} 
                className="tooltip-wrapper"
                onMouseEnter={() => setActiveTerm(term)}
                onMouseLeave={() => setActiveTerm(null)}
              >
                <span className="tooltip-text">{piece}</span>
                {activeTerm === term && (
                  <span className="tooltip-popup">
                    {glossary[term]}
                  </span>
                )}
              </span>
            );
          }
          return piece;
        });
      });
    });
    return result;
  };

  return <>{renderContent()}</>;
}

export default Tooltip;
