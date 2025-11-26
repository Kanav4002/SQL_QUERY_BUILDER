# AI SQL Query Builder

A React application that allows users to describe queries in natural language and convert them to SQL.

## Features

- Clean, modern UI matching the provided design
- Natural language to SQL conversion interface
- Dark theme with gradient background
- Responsive design
- Copy to clipboard functionality
- Real-time preview

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used

- React 18
- CSS3 with modern features
- Inter font family
- Responsive grid layout# 🤖 AI SQL Query Builder

A full-stack AI-powered application that converts natural language descriptions into optimized SQL queries using Google Gemini AI.

## ✨ Features

- 🧠 **AI-Powered**: Uses Google Gemini 2.5 Flash for real SQL generation
- 🎨 **Beautiful UI**: Modern React interface with Overgrowth green theme
- 💬 **Natural Language**: Describe queries in plain English
- 📋 **Copy to Clipboard**: One-click SQL copying with visual feedback
- 🔄 **Real-time Generation**: Fast response times (1-2 seconds)
- 🆓 **Free to Use**: Google Gemini API is completely free
- 📱 **Responsive**: Works on desktop and mobile
- 🛡️ **Secure**: Environment variables protected

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ 
- npm or yarn
- Google account for free Gemini API key

### 1. Clone Repository
```bash
git clone https://github.com/Kanav4002/SQL_QUERY_BUILDER.git
cd SQL_QUERY_BUILDER
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Get your free Gemini API key:
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key" 
4. Copy the key and add to `.env`:
```
GEMINI_API_KEY=AIzaSyD...your_key_here
```

Start backend server:
```bash
npm run dev
# Server runs on http://localhost:5001
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
# App opens on http://localhost:3000
```

## 🎯 Usage

1. Open http://localhost:3000 in your browser
2. Enter a natural language query description:
   - "Get all users who placed orders in the last 30 days"
   - "Show me the top 10 products by revenue"
   - "Find customers who never made a purchase"
3. Click "Generate SQL"
4. Copy the generated SQL with one click

## 🏗️ Project Structure

```
sql_query_gen/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/       # React components
│   │   └── ...
│   └── package.json
├── backend/                  # Node.js API
│   ├── controllers/          # Business logic
│   ├── routes/              # API endpoints  
│   ├── utils/               # AI integrations
│   └── package.json
├── image/                   # Assets
└── docs/                    # Documentation
```

## 🔧 API Endpoints

### Generate SQL
```bash
POST /api/sql/generate
Content-Type: application/json

{
  "description": "Your natural language query"
}
```

Response:
```json
{
  "success": true,
  "sql": "SELECT * FROM users WHERE created_at >= NOW() - INTERVAL '30 days'",
  "execution_time": "1.2s"
}
```

### Other Endpoints
- `POST /api/sql/validate` - Validate SQL syntax
- `POST /api/sql/optimize` - Optimize SQL queries  
- `POST /api/sql/suggest` - Get query suggestions
- `GET /health` - Health check

## 🎨 Technologies

**Frontend:**
- React 18
- CSS3 (Grid, Flexbox, Glassmorphism)
- Modern JavaScript (ES6+)

**Backend:**
- Node.js + Express
- Google Gemini AI API
- OpenAI API (backup)
- CORS, Helmet (security)

## 🔐 Environment Variables

**Backend (.env):**
```bash
# Server
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# AI Configuration  
GEMINI_API_KEY=your_gemini_key_here
AI_PROVIDER=gemini

# Database (optional)
DATABASE_URL=your_db_url_here
```

## 🧪 Example Queries

Try these natural language descriptions:

**Simple:**
- "Get all users"
- "Show products under $50"
- "Count total orders"

**Complex:**
- "Find users who placed more than 5 orders"
- "Calculate average order value per customer"
- "Show products that were never ordered"
- "Get monthly sales reports for the last year"

## 💰 Cost

- **Google Gemini**: 100% FREE
- **Quota**: 60 requests/minute, 1,500/day
- **No Credit Card Required**

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Heroku)
```bash
cd backend
# Set environment variables
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🐛 Troubleshooting

**"Mock mode" warning?**
- Add your Gemini API key to `backend/.env`

**Frontend not connecting to backend?**
- Ensure backend is running on port 5001
- Check CORS settings

**Complex queries failing?**
- Gemini has token limits for very complex requests
- Try breaking down into simpler queries

## 📚 Documentation

- [Backend Setup Guide](backend/SETUP_GUIDE.md)
- [Gemini API Setup](backend/GEMINI_SETUP.md) 
- [Implementation Details](IMPLEMENTATION_COMPLETE.md)
- [Project Summary](PROJECT_SUMMARY.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for free API access
- React team for the amazing framework
- Express.js community
- Contributors and testers

## 📞 Support

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/Kanav4002/SQL_QUERY_BUILDER/issues)
- 📖 Docs: Check the `/docs` folder

---

**Made with ❤️ by [Kanav Kumar](https://github.com/Kanav4002)**

⭐ **Star this repo if it helped you!**
