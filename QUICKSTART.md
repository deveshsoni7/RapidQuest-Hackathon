# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install MongoDB
Make sure MongoDB is installed and running on your system.

**Windows:**
- Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

### Step 2: Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed (defaults should work)
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Step 4: Start Using!

1. Open `http://localhost:5173` in your browser
2. Click "Upload Document" to add your first document
3. Start searching!

## 📝 Default Configuration

- **Backend Port**: 5000
- **Frontend Port**: 5173 (auto-assigned by Vite)
- **MongoDB**: localhost:27017
- **Database Name**: marketing-search

## ⚠️ Common Issues

**MongoDB not running:**
- Error: `MongoServerError: connect ECONNREFUSED`
- Solution: Start MongoDB service

**Port already in use:**
- Change PORT in `backend/.env`
- Frontend will auto-use next available port

**File upload fails:**
- Check file size (max 50MB)
- Ensure file type is supported
- Check `backend/uploads/` directory exists

## 🎯 Next Steps

- Upload multiple documents
- Try searching with keywords
- Use filters to narrow results
- Explore document previews

Happy coding! 🎉

