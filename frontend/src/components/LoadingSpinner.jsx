import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Fetching air quality data...</p>
    </div>
  );
};

export default LoadingSpinner;
