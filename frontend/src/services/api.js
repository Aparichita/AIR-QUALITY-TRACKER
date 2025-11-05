import axios from 'axios';

// Use proxy in development, or VITE_API_URL if set
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const fetchAQIData = async (city) => {
  try {
    const url = API_BASE_URL ? `${API_BASE_URL}/api/aqi` : '/api/aqi';
    const response = await axios.get(url, {
      params: { city }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to fetch AQI data'
    };
  }
};
