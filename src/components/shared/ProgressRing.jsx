import React from 'react';
import './ProgressRing.css';

function ProgressRing({ score }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="progress-ring-container">
      <svg className="progress-ring" width="160" height="160">
        <circle className="progress-ring-bg" strokeWidth="12" fill="transparent" r={radius} cx="80" cy="80" />
        <circle
          className="progress-ring-fill"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
      </svg>
      <div className="progress-ring-content">
        <div className="score-value">{score}</div>
        <div className="score-max">/ 100</div>
      </div>
    </div>
  );
}

export default ProgressRing;
