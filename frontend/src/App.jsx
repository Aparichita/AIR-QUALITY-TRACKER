import React, { useState } from 'react';
import { fetchAQIData } from './services/api';
import SearchBar from './components/SearchBar';
import AQICard from './components/AQICard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    if (!city || !city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setAqiData(null);

    const result = await fetchAQIData(city.trim());
    
    setLoading(false);
    
    if (result.success) {
      setAqiData(result.data);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">🌬️</span>
            Air Quality Tracker
          </h1>
          <p className="subtitle">Monitor air quality in your city</p>
        </header>

        <SearchBar onSearch={handleSearch} disabled={loading} />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {aqiData && <AQICard data={aqiData} />}
      </div>
    </div>
  );
}

export default App;
