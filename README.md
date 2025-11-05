# Air Quality Tracker - Full Stack Web App

A beautiful, modern full-stack web application for tracking air quality in cities worldwide.

## Features

- 🌬️ Real-time Air Quality Index (AQI) lookup
- 🤖 AI-powered health recommendations
- 📱 Responsive design for all devices
- ⚡ Fast and modern UI/UX
- 🔍 Search by city name

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (optional)
- OpenAI API for AI suggestions
- AQI API integration

### Frontend
- React 18
- Vite
- Axios for API calls
- Modern CSS with gradients and animations

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the project root:
```bash
cd "AIR QUALITY TRACKER"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string (optional)
AQI_API_KEY=your_aqi_api_key
OPENAI_API_KEY=your_openai_api_key (optional)
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, uses proxy by default):
```env
VITE_API_URL=http://localhost:5000
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### GET `/api/aqi?city=<city_name>`
Fetches air quality data for a specified city.

**Query Parameters:**
- `city` (required): Name of the city

**Response:**
```json
{
  "city": "London",
  "aqi": 45,
  "suggestion": "AI-generated health recommendations..."
}
```

### GET `/api/hello`
Test endpoint to verify backend is running.

### GET `/`
Health check endpoint.

## Project Structure

```
AIR QUALITY TRACKER/
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── aqiController.js
│       ├── routes/
│       │   └── aqiRoutes.js
│       ├── utils/
│       │   └── aiHelper.js
│       └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AQICard.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json
└── .gitignore
```

## Getting API Keys

### AQI API Key
1. Visit [WAQI API](https://aqicn.org/api/)
2. Sign up for a free account
3. Get your API token

### OpenAI API Key (Optional)
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account
3. Generate an API key
4. Add credits to your account

## Running the Application

1. **Start Backend** (from root directory):
```bash
npm run dev
```

2. **Start Frontend** (from frontend directory):
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Build for Production

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

## Troubleshooting

- **Backend not starting**: Check if port 5000 is available and `.env` file is configured correctly
- **Frontend not connecting**: Ensure backend is running on port 5000
- **API errors**: Verify your API keys are correct in the `.env` file
- **CORS errors**: Backend has CORS enabled, but check if both servers are running

## License

ISC
