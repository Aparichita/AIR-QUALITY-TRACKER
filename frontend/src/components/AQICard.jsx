import React from 'react';
import './AQICard.css';

const AQICard = ({ data }) => {
  const { city, aqi, suggestion } = data;

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: '#10b981', bgColor: '#d1fae5' };
    if (aqi <= 100) return { level: 'Moderate', color: '#f59e0b', bgColor: '#fef3c7' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: '#f97316', bgColor: '#fed7aa' };
    if (aqi <= 200) return { level: 'Unhealthy', color: '#ef4444', bgColor: '#fee2e2' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: '#a855f7', bgColor: '#e9d5ff' };
    return { level: 'Hazardous', color: '#7c2d12', bgColor: '#fed7aa' };
  };

  const status = getAQIStatus(aqi);

  return (
    <div className="aqi-card">
      <div className="aqi-card-header">
        <h2 className="aqi-city">{city}</h2>
        <div className="aqi-badge" style={{ backgroundColor: status.bgColor, color: status.color }}>
          AQI: {aqi}
        </div>
      </div>
      
      <div className="aqi-status">
        <span className="status-label">Status:</span>
        <span className="status-value" style={{ color: status.color }}>
          {status.level}
        </span>
      </div>

      <div className="aqi-gauge">
        <div className="gauge-bar">
          <div 
            className="gauge-fill" 
            style={{ 
              width: `${Math.min((aqi / 300) * 100, 100)}%`,
              backgroundColor: status.color
            }}
          />
        </div>
      </div>

      {suggestion && (
        <div className="ai-suggestion">
          <div className="suggestion-header">
            <span className="ai-icon">🤖</span>
            <h3>AI Health Recommendations</h3>
          </div>
          <p className="suggestion-text">{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AQICard;
