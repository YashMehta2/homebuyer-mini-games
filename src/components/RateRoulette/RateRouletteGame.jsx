import React, { useState, useEffect } from 'react';
import RateRouletteResult from './RateRouletteResult';
import { calculateMonthlyPayment } from '../../utils/mortgageCalc';

function RateRouletteGame({ round, scenario, rates, onComplete }) {
  const [currentDay, setCurrentDay] = useState(1);
  const [lockedDay, setLockedDay] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Fast forward simulation if locked before day 30
  useEffect(() => {
    if (lockedDay !== null && currentDay < 30) {
      const timer = setTimeout(() => {
        setCurrentDay(prev => prev + 1);
      }, 80); // 80ms per tick
      return () => clearTimeout(timer);
    }
  }, [lockedDay, currentDay]);

  // If user reaches day 30 without locking, auto-lock
  useEffect(() => {
    if (currentDay === 30 && lockedDay === null) {
      setLockedDay(30);
    }
  }, [currentDay, lockedDay]);

  const displayDay = lockedDay !== null ? lockedDay : currentDay;
  const activeRate = rates[displayDay - 1];
  
  const monthlyPayment = calculateMonthlyPayment(scenario.amount, activeRate, scenario.term);
  const totalCost = monthlyPayment * scenario.term * 12;

  const handleWait = () => {
    if (currentDay < 30) {
      setCurrentDay(currentDay + 1);
    }
  };

  const handleLock = () => {
    setLockedDay(currentDay);
  };

  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  if (showResult) {
    return (
      <RateRouletteResult 
        scenario={scenario} 
        rates={rates} 
        lockedDay={lockedDay} 
        lockedRate={rates[lockedDay - 1]} 
        onNext={(result) => onComplete(result)} 
      />
    );
  }

  const minRate = Math.min(...rates) - 0.2;
  const maxRate = Math.max(...rates) + 0.2;
  const range = maxRate - minRate;
  
  // SVG Chart Dimensions
  const padding = 40;
  const width = 600;
  const height = 250;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const getX = (index) => padding + (index / 29) * chartWidth;
  const getY = (rateValue) => padding + chartHeight - (((rateValue - minRate) / range) * chartHeight);

  return (
    <div className="card fade-in game-screen text-center">
      <div className="status-bar" style={{ marginBottom: 8 }}>
        <span>Scenario {round + 1} of 3</span>
        <span>{formatMoney(scenario.amount)} • {scenario.term}-Year Fixed</span>
      </div>
      <div style={{ marginBottom: 24, fontSize: 14, color: 'var(--text-muted)' }}>
        {scenario.description}
      </div>

      <div className="chart-container" style={{ padding: '16px 0' }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="rate-chart" style={{ width: '100%', height: 'auto', background: 'transparent' }}>
          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
          <line x1={padding} y1={padding + chartHeight/2} x2={width - padding} y2={padding + chartHeight/2} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" />
          
          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" />
          
          {/* Y-Axis Labels */}
          <text x={padding - 10} y={padding + 5} fill="var(--text-muted)" fontSize="12" textAnchor="end">{maxRate.toFixed(2)}%</text>
          <text x={padding - 10} y={padding + chartHeight/2 + 5} fill="var(--text-muted)" fontSize="12" textAnchor="end">{((maxRate + minRate) / 2).toFixed(2)}%</text>
          <text x={padding - 10} y={height - padding + 5} fill="var(--text-muted)" fontSize="12" textAnchor="end">{minRate.toFixed(2)}%</text>
          
          {/* X-Axis Labels */}
          <text x={padding} y={height - padding + 20} fill="var(--text-muted)" fontSize="12" textAnchor="middle">Day 1</text>
          <text x={padding + chartWidth/2} y={height - padding + 20} fill="var(--text-muted)" fontSize="12" textAnchor="middle">Day 15</text>
          <text x={width - padding} y={height - padding + 20} fill="var(--text-muted)" fontSize="12" textAnchor="middle">Day 30</text>

          {/* Locked Marker (if locked) */}
          {lockedDay !== null && (
            <g>
              <line 
                x1={getX(lockedDay - 1)} 
                y1={padding} 
                x2={getX(lockedDay - 1)} 
                y2={height - padding} 
                stroke="var(--accent-green)" 
                strokeDasharray="4 4" 
                strokeWidth="2"
              />
              <circle cx={getX(lockedDay - 1)} cy={getY(rates[lockedDay - 1])} r="6" fill="var(--accent-green)" />
              <text x={getX(lockedDay - 1)} y={padding - 10} fill="var(--accent-green)" fontSize="12" fontWeight="bold" textAnchor="middle">Locked</text>
            </g>
          )}

          {/* Line Chart */}
          <polyline 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="3" 
            points={rates.slice(0, currentDay).map((r, i) => `${getX(i)},${getY(r)}`).join(' ')} 
          />
          
          {/* Current Day / Animated Points */}
          {rates.slice(0, currentDay).map((r, i) => (
            <circle key={i} cx={getX(i)} cy={getY(r)} r={i === currentDay - 1 ? "6" : "4"} fill="var(--primary)" style={{ cursor: 'crosshair' }}>
              <title>Day {i + 1}: {r.toFixed(2)}%</title>
            </circle>
          ))}
        </svg>
        
        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: '50%' }}></span> Rate Path
          </span>
          {lockedDay !== null && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, background: 'var(--accent-green)', borderRadius: '50%' }}></span> Locked Point
            </span>
          )}
        </div>
      </div>

      <div className="current-rate-display">
        {lockedDay !== null ? (
          <h3 style={{ color: 'var(--accent-green)' }}>You Locked on Day {lockedDay}</h3>
        ) : (
          <h3>Day {currentDay}</h3>
        )}
        <div className="big-rate" style={{ color: lockedDay !== null ? 'var(--accent-green)' : 'var(--primary)' }}>
          {activeRate.toFixed(2)}%
        </div>
        {lockedDay !== null && currentDay < 30 && (
          <div style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 14 }}>
            Simulating remaining month... (Day {currentDay}/30)
          </div>
        )}
      </div>

      <div className="rate-impact">
        <div className="impact-col">
          <small>Monthly Payment</small>
          <div className="val">{formatMoney(monthlyPayment)}</div>
        </div>
        <div className="impact-col">
          <small>Total Cost (Life of Loan)</small>
          <div className="val">{formatMoney(totalCost)}</div>
        </div>
      </div>

      <div className="game-actions">
        {lockedDay === null ? (
          <>
            <button className="btn-accent lock-btn" onClick={handleLock}>🔒 Lock This Rate</button>
            <button className="btn-outline wait-btn" onClick={handleWait}>⏭️ Wait</button>
          </>
        ) : (
          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '18px' }}
            disabled={currentDay < 30}
            onClick={() => setShowResult(true)}
          >
            {currentDay < 30 ? 'Simulating...' : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  );
}

export default RateRouletteGame;
