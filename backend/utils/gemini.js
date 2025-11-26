const axios = require('axios');

// Function to call Google Gemini API for SQL generation
async function generateSQLWithGemini(userInput, databaseSchema) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured');
  }

  // Format the database schema for the prompt
  const schemaText = formatSchemaForPrompt(databaseSchema);

  // Fixed prompt for SQL generation - very strict
  const prompt = `Generate ONLY raw SQL. No explanations. No comments. No markdown. Just the SQL query.

Schema:
${schemaText}

Task: ${userInput}

SQL:`;

  try {
    // Use Gemini 2.5 Flash which is available with your API key
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,  // Increased for complex queries
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Better error handling for Gemini response
    if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
      console.error('Gemini API returned empty response:', response.data);
      throw new Error('Gemini returned empty response');
    }

    const candidate = response.data.candidates[0];
    
    // Handle MAX_TOKENS case - response might be incomplete
    if (candidate.finishReason === 'MAX_TOKENS') {
      console.warn('Gemini hit MAX_TOKENS limit, response may be incomplete');
      // Try to extract whatever SQL was generated
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        let partialSQL = candidate.content.parts[0].text.trim();
        if (partialSQL) {
          return partialSQL.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();
        }
      }
      throw new Error('Gemini exceeded token limit with no usable output');
    }
    
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('Gemini API returned invalid structure:', candidate);
      throw new Error('Invalid Gemini response structure');
    }

    let sqlQuery = candidate.content.parts[0].text.trim();
    
    // Clean up the response - remove markdown code blocks if present
    sqlQuery = sqlQuery.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Remove any leading/trailing comments
    sqlQuery = sqlQuery.replace(/^--.*\n/gm, '').trim();
    
    return sqlQuery;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    console.error('Full error:', error);
    throw new Error('Failed to generate SQL with Gemini AI');
  }
}

// Format database schema for the prompt
function formatSchemaForPrompt(schema) {
  try {
    const schemaObj = typeof schema === 'string' ? JSON.parse(schema) : schema;
    let formattedSchema = '';

    for (const [tableName, tableInfo] of Object.entries(schemaObj.tables)) {
      formattedSchema += `\nTable: ${tableName}\n`;
      formattedSchema += 'Columns:\n';
      
      for (const [columnName, columnType] of Object.entries(tableInfo.columns)) {
        formattedSchema += `  - ${columnName}: ${columnType}\n`;
      }
      
      if (tableInfo.relationships && tableInfo.relationships.length > 0) {
        formattedSchema += 'Relationships:\n';
        tableInfo.relationships.forEach(rel => {
          formattedSchema += `  - ${rel}\n`;
        });
      }
      formattedSchema += '\n';
    }

    return formattedSchema;
  } catch (error) {
    console.error('Error formatting schema:', error);
    return 'Schema format error';
  }
}

module.exports = {
  generateSQLWithGemini
};