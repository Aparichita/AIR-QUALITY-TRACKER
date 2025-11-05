# Environment Variables Guide

## 📍 WHERE TO PUT ENVIRONMENT VARIABLES

### ✅ FOR LOCAL DEVELOPMENT (VS Code)

#### Backend `.env` file (Create in ROOT directory)
Create a file named `.env` in the root directory (`AIR QUALITY TRACKER/.env`):

```env
AQI_API_KEY=your_aqi_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
MONGO_URI=your_mongodb_uri_here
PORT=5000
```

**DO NOT include these for local development:**
- ❌ `NODE_ENV=production` (only for production)
- ❌ `FRONTEND_URL=...` (only for production)

#### Frontend `.env` file (OPTIONAL - Create in frontend directory)
**You DON'T need this for local development!** Vite proxy handles it automatically.

If you want to test with production backend, create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

---

### 🚀 FOR PRODUCTION DEPLOYMENT

#### Backend (Render/Railway/Heroku)

Set these in your deployment platform's dashboard:

```env
AQI_API_KEY=your_aqi_api_key
OPENAI_API_KEY=your_openai_key (optional)
MONGO_URI=your_mongodb_uri (optional)
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

**Note:** Render automatically sets `PORT` - don't set it manually.

#### Frontend (Vercel/Netlify)

Set this in your deployment platform's dashboard:

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 📋 QUICK REFERENCE

### Local Development (VS Code)

**Root `.env` file:**
- ✅ `AQI_API_KEY` (required)
- ✅ `OPENAI_API_KEY` (optional)
- ✅ `MONGO_URI` (optional)
- ✅ `PORT=5000` (optional)

**Frontend `.env` file:**
- ❌ NOT NEEDED (Vite proxy handles it)

### Production Deployment

**Backend (Render):**
- ✅ `AQI_API_KEY` (required)
- ✅ `OPENAI_API_KEY` (optional)
- ✅ `MONGO_URI` (optional)
- ✅ `FRONTEND_URL` (your frontend domain)
- ✅ `NODE_ENV=production`

**Frontend (Vercel):**
- ✅ `VITE_API_URL` (your backend URL)

---

## 🔑 HOW TO GET API KEYS

1. **AQI_API_KEY**: https://aqicn.org/api/ (free, sign up)
2. **OPENAI_API_KEY**: https://platform.openai.com/ (optional, requires credits)
3. **MONGO_URI**: MongoDB Atlas (optional, free tier available)

---

## 📝 SUMMARY

- **Local VS Code**: Only need `AQI_API_KEY` in root `.env` file
- **Production Backend**: Add `FRONTEND_URL` and `NODE_ENV=production`
- **Production Frontend**: Add `VITE_API_URL` in deployment dashboard
- **Frontend local `.env`**: NOT NEEDED (Vite proxy works automatically)
