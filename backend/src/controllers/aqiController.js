const axios = require("axios");
const { getAISuggestion } = require("../utils/aiHelper");

const getAQIData = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city || typeof city !== "string" || !city.trim()) {
      return res.status(400).json({ error: "Query parameter 'city' is required" });
    }

    const apiKey = process.env.AQI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Server is missing AQI_API_KEY configuration" });
    }

    // Fetch AQI data with timeout
    const { data } = await axios.get(`https://api.waqi.info/feed/${city}/?token=${apiKey}`, {
      timeout: 20000 // 20 second timeout for external API
    });

    if (data.status !== "ok") return res.status(404).json({ message: "City not found" });

    const aqi = data.data?.aqi;
    if (typeof aqi !== "number") {
      return res.status(502).json({ error: "Invalid AQI data received from provider" });
    }

    // Get AI suggestion with timeout (don't block if it fails)
    let suggestion = null;
    try {
      suggestion = await Promise.race([
        getAISuggestion(aqi),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('AI suggestion timeout')), 15000)
        )
      ]);
    } catch (aiError) {
      console.error('AI suggestion failed:', aiError.message);
      suggestion = "Unable to generate AI suggestion right now. General advice: Monitor air quality levels and limit outdoor activity if AQI is high.";
    }

    res.json({ city, aqi, suggestion });
  } catch (err) {
    console.error('AQI API Error:', err.message);
    
    if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
      return res.status(504).json({ error: "AQI service is taking too long to respond. Please try again." });
    }
    
    res.status(500).json({ error: err.message || "Server error" });
  }
};

module.exports = { getAQIData };