# Backend Setup Guide - AI SQL Query Builder

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure OpenAI API Key

1. Get your OpenAI API key from: https://platform.openai.com/api-keys
2. Open the `.env` file in the backend directory
3. Replace `your_openai_api_key_here` with your actual API key:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Configure Your Database Schema (Optional)

The default schema includes tables: `users`, `orders`, `products`, and `order_items`.

To customize, edit the `DATABASE_SCHEMA` in `.env` file:

```json
{
  "tables": {
    "your_table_name": {
      "columns": {
        "column_name": "DATA_TYPE",
        "id": "INTEGER PRIMARY KEY",
        "name": "VARCHAR(255)"
      },
      "relationships": [
        "FOREIGN KEY (user_id) REFERENCES users(id)"
      ]
    }
  }
}
```

### Step 4: Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:5001`

---

## 🔧 How It Works

### The 4-Step Logic:

1. **Receive user input**: User provides natural language query description
2. **Add database schema**: System loads schema from environment variables
3. **Run AI model with fixed prompt**: Calls OpenAI API with system prompt
4. **Return only SQL**: Returns clean SQL query with no explanations

### API Endpoint

**POST** `/api/sql/generate`

**Request:**
```json
{
  "description": "Get all users who placed orders in the last 30 days"
}
```

**Response:**
```json
{
  "success": true,
  "sql": "SELECT DISTINCT u.* FROM users u JOIN orders o ON u.id = o.user_id WHERE o.created_at >= NOW() - INTERVAL '30 days';",
  "execution_time": "1.23s"
}
```

---

## 🧪 Testing

### Test with curl:
```bash
curl -X POST http://localhost:5001/api/sql/generate \
  -H "Content-Type: application/json" \
  -d '{"description": "Show all users with their total order amounts"}'
```

### Test without API key:
If you haven't configured the API key, the system will return:
```json
{
  "error": "AI service not configured",
  "message": "Please add your OpenAI API key to the .env file",
  "sql": "-- Please configure OPENAI_API_KEY in .env file"
}
```

---

## 📊 Default Database Schema

The backend comes pre-configured with an e-commerce database schema:

### Tables:

**users**
- id (INTEGER PRIMARY KEY)
- name (VARCHAR(255))
- email (VARCHAR(255) UNIQUE)
- created_at (TIMESTAMP)

**orders**
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER) → FK to users(id)
- total_amount (DECIMAL(10,2))
- status (VARCHAR(50))
- created_at (TIMESTAMP)

**products**
- id (INTEGER PRIMARY KEY)
- name (VARCHAR(255))
- price (DECIMAL(10,2))
- stock (INTEGER)
- created_at (TIMESTAMP)

**order_items**
- id (INTEGER PRIMARY KEY)
- order_id (INTEGER) → FK to orders(id)
- product_id (INTEGER) → FK to products(id)
- quantity (INTEGER)
- price (DECIMAL(10,2))

---

## 💡 Example Queries

Try these natural language queries:

1. "Get all users who placed orders in the last week"
2. "Show me the top 10 products by total revenue"
3. "Find users who have never placed an order"
4. "Calculate the average order value for each user"
5. "List all products that are out of stock"

---

## 🔒 Security Notes

- Never commit your `.env` file with API keys to Git
- The `.gitignore` already includes `.env`
- Keep your OpenAI API key secure
- Monitor your API usage at: https://platform.openai.com/usage

---

## 🐛 Troubleshooting

### Error: "OPENAI_API_KEY not configured"
- Make sure you added your API key to the `.env` file
- Restart the server after updating `.env`

### Error: "Failed to generate SQL with AI"
- Check your internet connection
- Verify your API key is valid
- Check OpenAI API status: https://status.openai.com/

### Error: "Database schema not configured"
- The `DATABASE_SCHEMA` variable in `.env` might be malformed
- Check JSON syntax is valid

---

## 📈 Cost Estimation

Using GPT-4 Turbo:
- ~$0.01 per 1,000 tokens
- Average query: ~200-300 tokens
- Estimated cost: ~$0.003 per query

---

## 🔄 Updating the Schema

1. Stop the server
2. Edit `DATABASE_SCHEMA` in `.env`
3. Restart the server
4. Test with a new query

---

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] OpenAI API key configured in `.env`
- [ ] Server starts without errors
- [ ] Test endpoint returns SQL
- [ ] Frontend can connect to backend

---

**Need Help?** 
- Check logs in the terminal
- Review the error messages
- Ensure all environment variables are set correctly