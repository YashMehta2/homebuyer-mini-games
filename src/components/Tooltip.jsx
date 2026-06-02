import React, { useState } from 'react';
import { tips } from '../data/tips';

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <span 
      className="tooltip-container" 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
    >
      <span className="tooltip-trigger">
        {children}
        <span className="info-icon">i</span>
      </span>
      {show && (
        <span className="tooltip-popup">
          {tips[text.toLowerCase()]}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
