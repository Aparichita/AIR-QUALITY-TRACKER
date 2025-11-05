const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAISuggestion = async (aqi) => {
  if (!process.env.OPENAI_API_KEY) {
    return "AI is not configured. General advice: Limit outdoor activity if AQI is high, wear a mask if sensitive, and use air purifiers indoors.";
  }
  const prompt = `The Air Quality Index is ${aqi}. Suggest health precautions and outdoor activity advice.`;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "Unable to generate AI suggestion right now.";
  }
};

module.exports = { getAISuggestion };