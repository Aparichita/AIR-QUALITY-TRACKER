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

    const { data } = await axios.get(`https://api.waqi.info/feed/${city}/?token=${apiKey}`);

    if (data.status !== "ok") return res.status(404).json({ message: "City not found" });

    const aqi = data.data?.aqi;
    if (typeof aqi !== "number") {
      return res.status(502).json({ error: "Invalid AQI data received from provider" });
    }

    const suggestion = await getAISuggestion(aqi);

    res.json({ city, aqi, suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAQIData };