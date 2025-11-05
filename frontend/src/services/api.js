import axios from 'axios';

// Use proxy in development, or VITE_API_URL if set
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const fetchAQIData = async (city) => {
  try {
    const url = API_BASE_URL ? `${API_BASE_URL}/api/aqi` : '/api/aqi';
    console.log('Fetching AQI for:', city, 'from URL:', url); // Debug log
    
    const response = await axios.get(url, {
      params: { city },
      timeout: 10000 // 10 second timeout
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error:', error); // Debug log
    
    // Better error messages
    if (error.code === 'ECONNABORTED') {
      return { success: false, error: 'Request timeout. Please try again.' };
    }
    if (error.response) {
      // Server responded with error
      return {
        success: false,
        error: error.response.data?.error || error.response.data?.message || `Server error: ${error.response.status}`
      };
    }
    if (error.request) {
      // Request made but no response
      return {
        success: false,
        error: 'Cannot reach server. Please check your internet connection and ensure the backend is running.'
      };
    }
    return {
      success: false,
      error: error.message || 'Failed to fetch AQI data'
    };
  }
};
