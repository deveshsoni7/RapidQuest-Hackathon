# Marketing Document Search Tool

A smart internal search tool that indexes all marketing documents and assets, delivers fast and relevant results, and helps teams find information instantly.

## 🚀 Features

- **Smart Document Indexing**: Automatically indexes documents in multiple formats (PDF, DOCX, TXT, MD, HTML, Images)
- **Intelligent Search**: Full-text search across document titles, descriptions, content, and tags
- **Automatic Categorization**: AI-powered categorization by topic, project, and team
- **Advanced Filtering**: Filter by category, project, team, and file type
- **Document Preview**: Preview documents and view metadata without downloading
- **File Management**: Upload, view, download, and delete documents
- **Responsive Design**: Beautiful, modern UI optimized for all devices
- **Real-time Search Suggestions**: Get search suggestions as you type

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **Natural** - Natural language processing for categorization
- **Mammoth** - DOCX to text conversion
- **PDF-Parse** - PDF text extraction

## 📁 Project Structure

```
Hackathone/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── documentController.js # Document CRUD operations
│   │   ├── searchController.js   # Search functionality
│   │   └── categoryController.js # Category management
│   ├── middleware/
│   │   └── upload.js            # File upload middleware
│   ├── models/
│   │   ├── Document.js          # Document model
│   │   └── Category.js          # Category model
│   ├── routes/
│   │   ├── documentRoutes.js    # Document routes
│   │   ├── searchRoutes.js      # Search routes
│   │   └── categoryRoutes.js    # Category routes
│   ├── utils/
│   │   ├── fileParser.js        # File parsing utilities
│   │   └── categorizer.js       # Auto-categorization logic
│   ├── uploads/                 # Uploaded files storage
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx    # Search component
│   │   │   ├── DocumentCard.jsx # Document card component
│   │   │   ├── FilterBar.jsx    # Filter component
│   │   │   ├── UploadModal.jsx  # Upload modal
│   │   │   └── PreviewModal.jsx # Preview modal
│   │   ├── services/
│   │   │   ├── documentService.js # Document API service
│   │   │   ├── searchService.js   # Search API service
│   │   │   └── categoryService.js # Category API service
│   │   ├── config/
│   │   │   └── api.js           # API configuration
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Hackathone
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/marketing-search
# NODE_ENV=development
```

**Note**: Make sure MongoDB is running on your system. If MongoDB is installed locally, it should run on `mongodb://localhost:27017` by default.

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file (optional, for custom API URL)
# VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start it manually:
mongod
```

**macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# Or
brew services start mongodb-community
```

## 🚀 Running the Application

### Start Backend Server

```bash
# From backend directory
cd backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
# From frontend directory (in a new terminal)
cd frontend

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## 📖 Usage Guide

### Uploading Documents

1. Click the **"Upload Document"** button in the header
2. Select a file (PDF, DOCX, TXT, MD, HTML, or Image)
3. Fill in optional metadata (title, description, category, project, team)
4. Click **"Upload"** - the document will be automatically indexed and categorized

### Searching Documents

1. Use the search bar to enter keywords
2. Get real-time search suggestions as you type
3. Use filters to narrow down by category, project, or team
4. Click on a document card to view details and preview

### Viewing Documents

- Click **"View"** on any document card to see full details
- Click **"Download"** to download the original file
- View document metadata, tags, and content preview

## 🔌 API Endpoints

### Documents
- `POST /api/documents/upload` - Upload a document
- `GET /api/documents` - Get all documents (with pagination and filters)
- `GET /api/documents/:id` - Get document by ID
- `GET /api/documents/:id/file` - Download document file
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### Search
- `GET /api/search?q=query` - Search documents
- `GET /api/search/suggestions?q=query` - Get search suggestions
- `GET /api/search/popular` - Get popular search terms

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/stats` - Get category statistics
- `POST /api/categories` - Create a category

## 🎨 Features in Detail

### Automatic Categorization

The system automatically categorizes documents based on:
- **Category**: Campaign, Brand, Content, Strategy, Analytics, Sales, Product, Event, Research, Design
- **Project**: Q1-Q4 Campaigns, Product Launch, Brand Refresh, etc.
- **Team**: Marketing, Content, Design, Analytics, Sales

### Smart Search

- Full-text search across document content
- Relevance-based ranking
- Search suggestions and autocomplete
- Filter by multiple criteria simultaneously

### File Format Support

- **PDF** - Text extraction from PDF files
- **DOCX** - Microsoft Word documents
- **TXT/MD** - Plain text and Markdown files
- **HTML** - HTML documents
- **Images** - JPG, PNG, GIF, SVG, WebP

## 🏗️ Building for Production

### Build Frontend

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

### Run Production Build

```bash
# Frontend preview
cd frontend
npm run preview

# Backend (make sure NODE_ENV=production in .env)
cd backend
npm start
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod` or check MongoDB service status
- Verify connection string in `.env` file
- Check if MongoDB is listening on the default port (27017)

### Port Already in Use

- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically use the next available port

### File Upload Issues

- Check file size (max 50MB)
- Verify file type is supported
- Ensure `uploads/` directory exists and has write permissions

### CORS Issues

- Backend CORS is configured to allow all origins in development
- For production, update CORS settings in `backend/server.js`

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/marketing-search
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built for Hackathon 2025

## 🙏 Acknowledgments

- Natural language processing powered by Natural.js
- File parsing by Mammoth and PDF-Parse
- UI components styled with Tailwind CSS

---

**Happy Searching! 🎉**

#   R a p i d Q u e s t - H a c k a t h o n  
 