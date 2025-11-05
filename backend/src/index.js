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

// CORS configuration - Allow all Vercel/Netlify subdomains
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel preview and production deployments
    if (origin.includes('vercel.app') || origin.includes('netlify.app')) {
      return callback(null, true);
    }
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow specific frontend URL if set
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    
    // Allow all origins (you can restrict this later)
    callback(null, true);
  },
  credentials: false, // Set to false when using wildcard origin
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
