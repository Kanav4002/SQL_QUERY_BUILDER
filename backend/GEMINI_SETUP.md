# Google Gemini API Setup Guide (FREE!)

## 🆓 Why Gemini?

- **100% FREE** to use
- **Generous quota**: 60 requests per minute
- **No credit card required**
- **Same quality as paid alternatives**
- **Easy to set up** (2 minutes)

---

## 🚀 Quick Setup (2 Steps)

### Step 1: Get Your Free API Key

1. **Visit Google AI Studio**
   ```
   https://makersuite.google.com/app/apikey
   ```
   OR
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Sign in with Google Account**
   - Use any Gmail account
   - No payment info required

3. **Click "Create API Key"**
   - Choose "Create API key in new project" (recommended)
   - Copy the key (starts with `AIza...`)

### Step 2: Add to Your App

1. **Open `backend/.env` file**

2. **Replace this line:**
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **With your actual key:**
   ```env
   GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Save the file**

5. **Server auto-restarts** (or run `npm run dev`)

6. **Done!** 🎉

---

## 🧪 Test It Works

### Method 1: Use Frontend
```
1. Open http://localhost:3000
2. Enter: "Get all users"
3. Click "Generate SQL"
4. Should see real AI-generated SQL!
```

### Method 2: Use Terminal
```bash
curl -X POST http://localhost:5001/api/sql/generate \
  -H "Content-Type: application/json" \
  -d '{"description": "Get all users who placed orders"}'
```

Should return real SQL without "mock mode" warning!

---

## 📊 Gemini vs OpenAI

| Feature | Gemini | OpenAI |
|---------|--------|--------|
| **Cost** | FREE ✅ | Paid 💰 |
| **Quota** | 60 req/min | Depends on plan |
| **Setup** | 2 minutes | Requires billing |
| **Credit Card** | Not needed ✅ | Required |
| **Quality** | Excellent | Excellent |

---

## 🔧 Current Configuration

Your `.env` is now configured to use:
- **AI Provider**: `gemini` (default)
- **Model**: `gemini-pro`
- **Fallback**: Mock mode (if API key not configured)

---

## 🎯 What Happens Now

### With Gemini API Key:
✅ Real AI-generated SQL  
✅ Context-aware queries  
✅ Database schema awareness  
✅ No "mock mode" warnings  
✅ Professional results  

### Without API Key:
⚠️ Falls back to mock mode  
⚠️ Shows warning message  
✅ Still generates valid SQL  
✅ App continues to work  

---

## 💡 Tips

1. **Keep your API key secure**
   - Don't share it publicly
   - Don't commit to GitHub (already in .gitignore)

2. **Monitor your usage**
   - Visit: https://console.cloud.google.com/apis/dashboard
   - Check quota usage

3. **Quota limits (FREE tier)**
   - 60 requests per minute
   - 1,500 requests per day
   - More than enough for development!

---

## 🔄 Switch Between AI Providers

Edit `backend/.env`:

**Use Gemini (FREE):**
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyDxxxxxx...
```

**Use OpenAI (Paid):**
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-proj-xxxxx...
```

No code changes needed! Just change the config.

---

## 🐛 Troubleshooting

### Error: "Gemini API key not configured"
→ Add your API key to `.env` and save

### Error: "API key not valid"
→ Check you copied the full key from Google AI Studio

### Error: "Quota exceeded"
→ Wait a minute (60 requests per minute limit)

### Still using mock mode?
→ Make sure `AI_PROVIDER=gemini` in `.env`
→ Restart server: `npm run dev`

---

## 📞 Support Links

- **Get API Key**: https://makersuite.google.com/app/apikey
- **Documentation**: https://ai.google.dev/docs
- **Gemini API Docs**: https://ai.google.dev/tutorials/rest_quickstart
- **Quota Info**: https://ai.google.dev/pricing

---

## ✅ Quick Checklist

- [ ] Visit https://makersuite.google.com/app/apikey
- [ ] Create API key
- [ ] Copy key
- [ ] Paste in `backend/.env`
- [ ] Save file
- [ ] Test at http://localhost:3000
- [ ] Celebrate! 🎉

---

**Your AI SQL Query Builder with FREE Gemini API is ready!** 🚀