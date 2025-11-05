const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // CommonJS require

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (only if MONGO_URI is provided)
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log("⚠️  MongoDB URI not configured, skipping database connection");
}

// CORS configuration - Allow all origins for now (we'll restrict later)
app.use(cors({
  origin: '*', // Allow all origins temporarily
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("✅ Server is running successfully!"));

// Test route
app.get("/api/hello", (req, res) => res.json({ message: "Hello from backend!" }));

// AQI route
const { getAQIData } = require("./controllers/aqiController");
app.get("/api/aqi", getAQIData);

app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
