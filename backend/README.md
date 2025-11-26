# AI SQL Query Builder - Backend API

A Node.js Express backend API for the AI SQL Query Builder application. This API provides endpoints for generating, validating, and optimizing SQL queries using natural language processing.

## 🚀 Features

- **Natural Language to SQL**: Convert English descriptions to SQL queries
- **SQL Validation**: Validate SQL syntax and structure
- **Query Optimization**: Suggest performance improvements
- **Multiple Database Support**: PostgreSQL, MySQL, SQLite, etc.
- **RESTful API**: Clean and intuitive API endpoints
- **Rate Limiting**: Built-in protection against abuse
- **Comprehensive Logging**: Request tracking and error logging

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Optional: AI service API key (OpenAI, etc.)

## 🛠️ Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   # Edit .env with your configuration
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Health Check
```
GET /health
```

### SQL Generation
```
POST /api/sql/generate
Content-Type: application/json

{
  "description": "Show me the top 10 customers by total revenue in the last 30 days",
  "schema": "optional_schema_info", 
  "database_type": "postgresql"
}
```

## 📁 Project Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── routes/
│   └── sql.js            # SQL-related routes
├── controllers/
│   └── sqlController.js  # Business logic
└── middleware/
    └── validation.js     # Request validation
```

## 🧪 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input validation** - Request validation middleware
- **Error handling** - Comprehensive error management