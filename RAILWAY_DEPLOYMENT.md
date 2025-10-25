# Railway Deployment Guide for BridgeAI Tech

## Prerequisites

1. **MongoDB Atlas Account**: Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Railway Account**: Sign up at [railway.app](https://railway.app)
3. **Email Account**: Gmail with App Password enabled

---

## Step 1: Set Up MongoDB Atlas

1. Create a new cluster
2. Create a database user with password
3. Whitelist all IPs: `0.0.0.0/0`
4. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/bridgeai?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend to Railway

### A. Create New Project
1. Go to Railway dashboard
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `bridgeai-tech` repository
4. Railway will auto-detect Node.js

### B. Configure Environment Variables
Go to **Variables** tab and add:

**REQUIRED:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bridgeai
JWT_SECRET=your-random-32-character-secret-key-here
FRONTEND_URL=https://your-frontend-url.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=noreply@bridgeaitech.com
ADMIN_EMAIL=hello@bridgeaitech.com
```

**Optional (for integrations):**
```env
HUBSPOT_API_KEY=your-key
SALESFORCE_CLIENT_ID=your-id
SALESFORCE_CLIENT_SECRET=your-secret
```

### C. Configure Settings
1. **Root Directory**: Leave empty (uses `start.sh` in root)
2. **Start Command**: `bash start.sh` (auto-detected)
3. **Port**: Railway auto-injects `$PORT` variable

### D. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Get your Railway URL: `https://your-app.railway.app`

---

## Step 3: Seed the Database (One-Time)

After first deployment, run this command in Railway terminal:

```bash
cd backend && npm run seed
```

This creates:
- Admin user: `admin@bridgeaitech.com` / `admin123`
- 3 sample blog posts
- 3 sample case studies

---

## Step 4: Deploy Frontend (Vercel/Netlify)

### Option A: Vercel
1. Import repository to Vercel
2. Set root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `build`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app
   ```

### Option B: Netlify
1. Import repository to Netlify
2. Set base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app
   ```

---

## Step 5: Update Environment Variables

After deploying frontend, update Railway:
```env
FRONTEND_URL=https://your-frontend-url.vercel.app
```

Then redeploy backend.

---

## Testing Your Deployment

1. **Health Check**: `https://your-backend.railway.app/api/health`
2. **Blog Posts**: `https://your-backend.railway.app/api/blog`
3. **Frontend**: `https://your-frontend-url.vercel.app`
4. **Admin Login**: Use `admin@bridgeaitech.com` / `admin123`

---

## Common Issues & Solutions

### ❌ "Application Failed to Respond"
- **Cause**: Server not binding to `0.0.0.0`
- **Solution**: Already fixed in `server.js` line 640

### ❌ "Cannot connect to MongoDB"
- **Cause**: Wrong connection string or IP not whitelisted
- **Solution**: Check `MONGODB_URI` and whitelist `0.0.0.0/0` in Atlas

### ❌ "CORS Error"
- **Cause**: Wrong `FRONTEND_URL`
- **Solution**: Update `FRONTEND_URL` to match your actual frontend domain

### ❌ "Emails not sending"
- **Cause**: Invalid SMTP credentials
- **Solution**: Enable 2FA on Gmail and create App Password

---

## Environment Variables Checklist

- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` (MongoDB Atlas connection string)
- [ ] `JWT_SECRET` (min 32 characters)
- [ ] `FRONTEND_URL` (your Vercel/Netlify URL)
- [ ] `SMTP_HOST=smtp.gmail.com`
- [ ] `SMTP_PORT=587`
- [ ] `SMTP_USER` (your Gmail)
- [ ] `SMTP_PASS` (Gmail App Password)
- [ ] `SMTP_FROM` (sender email)
- [ ] `ADMIN_EMAIL` (where contact forms go)

---

## File Structure for Railway

```
bridgeai-tech2/
├── start.sh              # Railway startup script
├── railway.json          # Railway configuration
├── backend/
│   ├── server.js        # ✅ Binds to 0.0.0.0:$PORT
│   ├── package.json     # ✅ Has engines field
│   ├── seed.js          # Database seeder
│   └── .env.example     # Template for env vars
└── frontend/            # Deploy separately to Vercel
```

---

## Support

- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Gmail App Passwords: https://support.google.com/accounts/answer/185833

---

## Quick Deploy Commands

```bash
# Clone repo
git clone https://github.com/rahulprajapat123/bridgeai-tech.git
cd bridgeai-tech

# Push to Railway (via GitHub integration)
git push origin main

# Seed database (Railway terminal)
cd backend && npm run seed
```

---

**Your backend is now production-ready for Railway! 🚀**
