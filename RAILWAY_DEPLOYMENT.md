# Railway Deployment Guide

## 🚀 Deploying Backend to Railway

This guide will help you deploy the backend service to Railway.

## Prerequisites

1. A Railway account (sign up at [railway.app](https://railway.app))
2. MongoDB database (MongoDB Atlas recommended for production)
3. Frontend deployed and its URL

## Step-by-Step Deployment

### 1. Create a New Railway Project

1. Log in to Railway
2. Click "New Project"
3. Select "Deploy from GitHub repo" or "Empty Project"

### 2. Add MongoDB Service (if using Railway MongoDB)

1. Click "New" → "Database" → "MongoDB"
2. Railway will automatically create a MongoDB instance
3. Copy the connection string from the MongoDB service variables

### 3. Deploy Backend Service

#### Option A: Deploy from GitHub

1. Connect your GitHub repository
2. Set the **Root Directory** to `backend` in Railway service settings
3. Railway will automatically detect the Node.js app

#### Option B: Deploy via Railway CLI

```bash
cd backend
railway login
railway init
railway up
```

### 4. Configure Environment Variables

In your Railway service, go to **Variables** tab and add:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string_here
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://your-frontend-url.com
```

**Important Variables:**
- `MONGODB_URI`: Your MongoDB connection string (from Railway MongoDB or MongoDB Atlas)
- `ALLOWED_ORIGINS`: Comma-separated list of frontend URLs (no trailing slashes)
- `PORT`: Railway will automatically set this, but you can override it

### 5. Deploy Frontend (Vercel/Netlify)

Make sure to set the frontend environment variable:

**For Vercel:**
```env
VITE_API_URL=https://your-railway-app.up.railway.app/api
```

**For Netlify:**
```env
VITE_API_URL=https://your-railway-app.up.railway.app/api
```

### 6. Get Your Backend URL

1. After deployment, Railway will provide a URL like: `https://your-app.up.railway.app`
2. Your API endpoints will be at: `https://your-app.up.railway.app/api`
3. Update your frontend `VITE_API_URL` with this URL

## 🔧 Troubleshooting

### Build Failed

**Issue:** Railway build fails with "Cannot find module" or "Command not found"

**Solution:**
- Ensure `Root Directory` is set to `backend` in Railway service settings
- Check that `package.json` exists in the backend directory
- Verify Node.js version compatibility (should be 18+)

### Connection Refused / CORS Errors

**Issue:** Frontend cannot connect to backend

**Solutions:**
1. Check `ALLOWED_ORIGINS` includes your frontend URL (without trailing slash)
2. Verify `VITE_API_URL` in frontend matches your Railway backend URL
3. Ensure backend is deployed and running (check Railway logs)

### MongoDB Connection Failed

**Issue:** Backend cannot connect to MongoDB

**Solutions:**
1. Verify `MONGODB_URI` is correctly set in Railway variables
2. Check MongoDB IP whitelist if using MongoDB Atlas
3. Ensure MongoDB service is running (if using Railway MongoDB)

### Port Already in Use

**Issue:** Railway shows port conflict

**Solution:**
- Railway automatically assigns a port via `PORT` environment variable
- Your code already uses `process.env.PORT || 5000`, which should work
- Don't hardcode port numbers

## 📋 Verification Checklist

- [ ] Backend deployed successfully on Railway
- [ ] MongoDB connected and working
- [ ] Environment variables set correctly
- [ ] Backend URL accessible (test `/api/health` endpoint)
- [ ] CORS configured with frontend URL
- [ ] Frontend environment variable `VITE_API_URL` set
- [ ] Frontend can make API calls successfully

## 🧪 Testing Your Deployment

1. **Test Health Endpoint:**
   ```bash
   curl https://your-app.up.railway.app/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Test from Frontend:**
   - Open browser console
   - Check network tab for API calls
   - Look for any CORS or connection errors

3. **Check Railway Logs:**
   - Go to Railway dashboard → Your service → Deployments → View logs
   - Look for "Server running on port" message
   - Check for any error messages

## 🔗 Important URLs

- **Backend API Base:** `https://your-app.up.railway.app/api`
- **Health Check:** `https://your-app.up.railway.app/api/health`
- **Documents API:** `https://your-app.up.railway.app/api/documents`
- **Search API:** `https://your-app.up.railway.app/api/search`

## 📝 Notes

- Railway automatically provides HTTPS
- The service will restart automatically on failures (configured in `nixpacks.toml`)
- Use Railway's built-in MongoDB for easier setup, or MongoDB Atlas for production
- Keep your `.env` files secure and never commit them

## 🆘 Need Help?

If you're still experiencing issues:
1. Check Railway build logs in the dashboard
2. Verify all environment variables are set correctly
3. Test the backend API directly using curl or Postman
4. Check browser console for frontend connection errors

