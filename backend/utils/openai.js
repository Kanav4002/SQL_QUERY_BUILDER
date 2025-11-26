const axios = require('axios');

// Function to call OpenAI API for SQL generation
async function generateSQLWithAI(userInput, databaseSchema) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    throw new Error('OpenAI API key not configured');
  }

  // Format the database schema for the prompt
  const schemaText = formatSchemaForPrompt(databaseSchema);

  // Fixed prompt as per requirements
  const systemPrompt = `You are a SQL query generator. Given a database schema and user request, generate ONLY the SQL query with no explanation, comments, or additional text. Return ONLY valid SQL code.`;

  const userPrompt = `Database Schema:
${schemaText}

User Request: ${userInput}

Generate ONLY the SQL query (no explanations, no comments, no markdown):`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let sqlQuery = response.data.choices[0].message.content.trim();
    
    // Clean up the response - remove markdown code blocks if present
    sqlQuery = sqlQuery.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Remove any leading/trailing comments
    sqlQuery = sqlQuery.replace(/^--.*\n/gm, '').trim();
    
    return sqlQuery;
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    throw new Error('Failed to generate SQL with AI');
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
  generateSQLWithAI
};