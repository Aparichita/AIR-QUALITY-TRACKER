# Deployment Guide - Air Quality Tracker

This guide covers deploying both backend and frontend to various platforms.

## Table of Contents
1. [Backend Deployment](#backend-deployment)
   - [Render](#render-backend)
   - [Railway](#railway-backend)
   - [Heroku](#heroku-backend)
   - [Vercel](#vercel-backend)
2. [Frontend Deployment](#frontend-deployment)
   - [Vercel](#vercel-frontend)
   - [Netlify](#netlify-frontend)
   - [GitHub Pages](#github-pages-frontend)
3. [Full Stack Deployment](#full-stack-deployment)
   - [Same Domain](#same-domain-deployment)

---

## Backend Deployment

### Render (Backend)

**Recommended for beginners** - Free tier available

1. **Sign up** at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Name: `air-quality-tracker-backend`
   - Root Directory: Leave blank (root)
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

3. **Set Environment Variables**:
   ```
   PORT=10000
   AQI_API_KEY=your_aqi_api_key
   OPENAI_API_KEY=your_openai_key (optional)
   MONGO_URI=your_mongodb_uri (optional)
   NODE_ENV=production
   ```

4. **Deploy** - Render will automatically deploy

5. **Get your backend URL**: `https://your-app-name.onrender.com`

---

### Railway (Backend)

**Great for MongoDB integration**

1. **Sign up** at [railway.app](https://railway.app)

2. **Create New Project** → Deploy from GitHub

3. **Configure**:
   - Root Directory: Leave blank
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**:
   - `AQI_API_KEY`
   - `OPENAI_API_KEY` (optional)
   - `MONGO_URI` (optional)

5. **Deploy** - Railway auto-detects and deploys

---

### Heroku (Backend)

**Classic platform, stable**

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli

2. **Login**:
   ```bash
   heroku login
   ```

3. **Create App**:
   ```bash
   heroku create your-app-name-backend
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set AQI_API_KEY=your_key
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set MONGO_URI=your_uri
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

---

### Vercel (Backend)

**Best for serverless functions**

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Create `vercel.json`** in root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "backend/src/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "backend/src/index.js"
       }
     ]
   }
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

---

## Frontend Deployment

### Vercel (Frontend) ⭐ RECOMMENDED

**Best option - Fast, free, easy**

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

3. **Build**:
   ```bash
   npm install
   npm run build
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   Or connect GitHub repo at [vercel.com](https://vercel.com)

5. **Set Environment Variable**:
   - `VITE_API_URL=https://your-backend-url.com`

6. **Redeploy** after setting env vars

**Or use Vercel Dashboard**:
- Connect GitHub repo
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Output Directory: `dist`
- Environment Variables: `VITE_API_URL=your_backend_url`

---

### Netlify (Frontend)

**Great alternative, easy setup**

1. **Build locally**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Or via Netlify Dashboard**:
   - Connect GitHub repo
   - Base directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `frontend/dist`
   - Environment variables: `VITE_API_URL=your_backend_url`

---

### GitHub Pages (Frontend)

**Free hosting via GitHub**

1. **Update `vite.config.js`**:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

3. **Add to `package.json`**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages** in repo settings (Settings → Pages)

---

## Full Stack Deployment

### Option 1: Separate Deployments (Recommended)

- **Backend**: Deploy to Render/Railway/Heroku
- **Frontend**: Deploy to Vercel/Netlify
- **Update frontend** `VITE_API_URL` to point to backend URL

### Option 2: Same Domain Deployment

**Backend serves frontend** (Render example):

1. **Update backend `index.js`** to serve static files:
   ```javascript
   // Add before routes
   if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '../frontend/dist')));
     app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
     });
   }
   ```

2. **Update build process** to build frontend first

---

## Quick Deployment Checklist

### Before Deployment:

- [ ] Update CORS to allow your frontend domain
- [ ] Set all environment variables
- [ ] Test build locally: `npm run build` (frontend)
- [ ] Update `VITE_API_URL` in frontend
- [ ] Remove console.logs in production code
- [ ] Update README with live URLs

### Backend Environment Variables:
```
PORT=5000 (or platform default)
AQI_API_KEY=your_key
OPENAI_API_KEY=your_key (optional)
MONGO_URI=your_mongodb_uri (optional)
NODE_ENV=production
```

### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend-url.com
```

---

## Updating CORS for Production

Update `backend/src/index.js`:

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));
```

---

## Testing Deployment

1. **Backend Health Check**: `https://your-backend.com/`
2. **Backend API Test**: `https://your-backend.com/api/hello`
3. **Frontend**: `https://your-frontend.com`

---

## Recommended Stack

**Best for Beginners**:
- Backend: **Render** (free, easy)
- Frontend: **Vercel** (free, fast)

**Best for Production**:
- Backend: **Railway** (better MongoDB support)
- Frontend: **Vercel** (CDN, fast)

---

## Troubleshooting

### Backend Issues:
- Check logs in platform dashboard
- Verify environment variables are set
- Ensure PORT is correctly configured
- Check CORS settings

### Frontend Issues:
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors
- Ensure backend is accessible
- Check CORS headers

### Common Errors:
- **CORS Error**: Update backend CORS to include frontend domain
- **404 on Refresh**: Configure redirect rules (Vercel/Netlify)
- **API Not Found**: Check `VITE_API_URL` environment variable
