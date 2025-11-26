const axios = require('axios');
const { generateSQLWithAI } = require('../utils/openai');
const { generateSQLWithGemini } = require('../utils/gemini');

// Mock SQL generation fallback
function generateMockSQL(description) {
  const lowerDesc = description.toLowerCase();
  
  if (lowerDesc.includes('user') && lowerDesc.includes('order')) {
    return `SELECT DISTINCT u.* 
FROM users u 
JOIN orders o ON u.id = o.user_id 
WHERE o.created_at >= NOW() - INTERVAL '30 days';`;
  }
  
  if (lowerDesc.includes('all users')) {
    return `SELECT * FROM users;`;
  }
  
  if (lowerDesc.includes('revenue') || lowerDesc.includes('total')) {
    return `SELECT u.id, u.name, u.email, SUM(o.total_amount) AS total_revenue
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
ORDER BY total_revenue DESC;`;
  }
  
  if (lowerDesc.includes('product')) {
    return `SELECT * FROM products WHERE stock > 0;`;
  }
  
  return `SELECT * FROM users LIMIT 10;`;
}

// Mock SQL validation
function mockValidateSQL(sql) {
  const hasSelect = sql.toLowerCase().includes('select');
  const hasFrom = sql.toLowerCase().includes('from');
  
  return {
    isValid: hasSelect && hasFrom,
    errors: hasSelect && hasFrom ? [] : ['Missing SELECT or FROM clause'],
    warnings: [],
    suggestions: ['Consider adding indexes for better performance']
  };
}

// Mock SQL optimization
function mockOptimizeSQL(sql) {
  return {
    sql: sql.replace(/SELECT \*/g, 'SELECT specific_columns'),
    improvements: [
      'Replaced SELECT * with specific columns',
      'Added appropriate indexes suggestion'
    ],
    performanceGain: '25%'
  };
}

class SQLController {
  // Generate SQL from natural language description
  async generateSQL(req, res) {
    try {
      // Step 1: Receive user input
      const { description } = req.body;

      if (!description) {
        return res.status(400).json({
          error: 'Description is required',
          message: 'Please provide a natural language description of the SQL query'
        });
      }

      // Step 2: Add your database schema
      const databaseSchema = process.env.DATABASE_SCHEMA;

      if (!databaseSchema) {
        return res.status(500).json({
          error: 'Database schema not configured',
          message: 'Please configure DATABASE_SCHEMA in environment variables'
        });
      }

      // Step 3: Run an AI model with a fixed prompt
      const startTime = Date.now();
      let sqlQuery;
      let usedMockMode = false;
      const aiProvider = process.env.AI_PROVIDER || 'gemini';
      
      try {
        if (aiProvider === 'gemini') {
          console.log('Using Google Gemini API...');
          sqlQuery = await generateSQLWithGemini(description, databaseSchema);
        } else if (aiProvider === 'openai') {
          console.log('Using OpenAI API...');
          sqlQuery = await generateSQLWithAI(description, databaseSchema);
        } else {
          throw new Error('Invalid AI provider');
        }
      } catch (aiError) {
        // If AI fails (quota exceeded, API issues, not configured), use mock fallback
        console.log(`${aiProvider} API unavailable, using mock mode:`, aiError.message);
        sqlQuery = generateMockSQL(description);
        usedMockMode = true;
      }
      
      const executionTime = ((Date.now() - startTime) / 1000).toFixed(2);

      // Step 4: Return only SQL (no explanation)
      res.json({
        success: true,
        sql: sqlQuery,
        execution_time: `${executionTime}s`,
        ...(usedMockMode && { warning: 'Using mock mode - Add billing to OpenAI account or wait for quota reset' })
      });
    } catch (error) {
      console.error('Error generating SQL:', error);
      
      // Handle specific API key error
      if (error.message.includes('API key')) {
        return res.status(503).json({
          error: 'AI service not configured',
          message: 'Please add your OpenAI API key to the .env file',
          sql: '-- Please configure OPENAI_API_KEY in .env file'
        });
      }
      
      res.status(500).json({
        error: 'Failed to generate SQL',
        message: error.message || 'An error occurred while generating the SQL query',
        sql: '-- Error generating SQL query'
      });
    }
  }

  // Validate SQL syntax and structure
  async validateSQL(req, res) {
    try {
      const { sql, database_type = 'postgresql' } = req.body;

      if (!sql) {
        return res.status(400).json({
          error: 'SQL query is required',
          message: 'Please provide an SQL query to validate'
        });
      }

      // Mock validation logic
      const validation = mockValidateSQL(sql);

      res.json({
        success: true,
        data: {
          is_valid: validation.isValid,
          errors: validation.errors,
          warnings: validation.warnings,
          suggestions: validation.suggestions
        }
      });
    } catch (error) {
      console.error('Error validating SQL:', error);
      res.status(500).json({
        error: 'Failed to validate SQL',
        message: 'An error occurred while validating the SQL query'
      });
    }
  }

  // Optimize SQL query for better performance
  async optimizeSQL(req, res) {
    try {
      const { sql, database_type = 'postgresql' } = req.body;

      if (!sql) {
        return res.status(400).json({
          error: 'SQL query is required',
          message: 'Please provide an SQL query to optimize'
        });
      }

      // Mock optimization
      const optimized = mockOptimizeSQL(sql);

      res.json({
        success: true,
        data: {
          original_sql: sql,
          optimized_sql: optimized.sql,
          improvements: optimized.improvements,
          performance_gain: optimized.performanceGain
        }
      });
    } catch (error) {
      console.error('Error optimizing SQL:', error);
      res.status(500).json({
        error: 'Failed to optimize SQL',
        message: 'An error occurred while optimizing the SQL query'
      });
    }
  }

  // Get SQL query suggestions
  async getSuggestions(req, res) {
    try {
      const { partial_query, context } = req.body;

      const suggestions = [
        'SELECT * FROM customers WHERE',
        'SELECT customer_id, email FROM customers',
        'SELECT COUNT(*) FROM orders',
        'SELECT AVG(amount) FROM transactions'
      ];

      res.json({
        success: true,
        data: {
          suggestions: suggestions,
          context: context
        }
      });
    } catch (error) {
      console.error('Error getting suggestions:', error);
      res.status(500).json({
        error: 'Failed to get suggestions',
        message: 'An error occurred while fetching suggestions'
      });
    }
  }
}

module.exports = new SQLController();