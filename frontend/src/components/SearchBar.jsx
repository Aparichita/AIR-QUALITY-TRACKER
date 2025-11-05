import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, disabled }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled && city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name (e.g., London, New York, Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={disabled}
        />
      </div>
      <button 
        type="submit" 
        className="search-button"
        disabled={disabled || !city.trim()}
      >
        {disabled ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
