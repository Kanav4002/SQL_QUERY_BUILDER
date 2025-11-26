import React, { useState } from 'react';
import './QueryBuilder.css';

const QueryBuilder = () => {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!query.trim()) {
      alert('Please enter a query description');
      return;
    }

    setIsGenerating(true);
    // Clear previous SQL immediately
    setGeneratedSQL('-- Generating...');
    
    try {
      console.log('=== NEW REQUEST ===');
      console.log('Query sent:', query);
      
      const response = await fetch('http://localhost:5001/api/sql/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: query
        }),
        cache: 'no-cache' // Prevent caching
      });

      const data = await response.json();
      
      console.log('Response received:', data);
      console.log('SQL from API:', data.sql);
      
      if (data.success && data.sql) {
        // Force update with new SQL
        setGeneratedSQL(''); // Clear first
        setTimeout(() => {
          setGeneratedSQL(data.sql);
          console.log('SQL state updated to:', data.sql);
        }, 10);
      } else {
        setGeneratedSQL(data.sql || '-- Error: Could not generate SQL');
        if (data.message) {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setGeneratedSQL('-- Error: Could not connect to backend server');
      alert('Failed to connect to the backend. Make sure the server is running on port 5001.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatSQL = (sql) => {
    if (!sql) {
      return '<span class="sql-comment">-- Generated SQL will appear here</span>';
    }
    return sql
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(SELECT|FROM|JOIN|WHERE|GROUP BY|ORDER BY|LIMIT|AS|SUM|NOW|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|INNER|LEFT|RIGHT|ON|AND|OR|IN|BETWEEN|LIKE|DISTINCT|COUNT|AVG|MAX|MIN)/gi, '<span class="sql-keyword">$1</span>')
      .replace(/(--[^\n]*)/g, '<span class="sql-comment">$1</span>')
      .replace(/(SUM|NOW|COUNT|AVG|MAX|MIN)/gi, '<span class="sql-function">$1</span>');
  };

  return (
    <div className="query-builder">
      <div className="status-indicator">
        <span className="dot green"></span>
        <span>Natural language to SQL in seconds</span>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <h1 className="title">AI SQL Query Builder</h1>
          <p className="subtitle">
            Describe your query in English and instantly turn it into
            optimized, production-ready SQL.
          </p>

          <div className="input-section">
            <label className="input-label">DESCRIBE YOUR QUERY IN ENGLISH</label>
            <textarea
              className="query-input"
              placeholder="e.g. Show me the top 10 customers by total revenue in the last 30 days, including their email and country."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="generate-section">
            <button 
              className="generate-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate SQL'}
            </button>
            <div className="speed-indicator">
              <span className="toggle-switch">
                <span className="toggle-dot"></span>
              </span>
              <span className="speed-text">Used by data teams to ship queries 5x faster</span>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="sql-header">
            <div className="sql-title-section">
              <span className="sql-title">GENERATED SQL</span>
              <span className="sql-subtitle">Ready to run in your warehouse</span>
            </div>
            <button 
              className="copy-btn"
              onClick={() => {
                if (generatedSQL) {
                  navigator.clipboard.writeText(generatedSQL);
                  setIsCopied(true);
                  // Revert back after 2 seconds
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                }
              }}
              disabled={!generatedSQL}
            >
              {isCopied ? '✓ Copied!' : '📋 Copy SQL'}
            </button>
          </div>

          <div className="sql-preview">
            <div className="preview-header">
              <div className="preview-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="preview-title">PREVIEW SQL</span>
              <span className="preview-db">PostgreSQL</span>
            </div>

            <div className="sql-content">
              <pre dangerouslySetInnerHTML={{ __html: formatSQL(generatedSQL) }}></pre>
            </div>
          </div>

          <div className="footer-info">
            <div className="info-left">
              <span>No schema? The model can infer tables and columns from your examples.</span>
            </div>
            <div className="info-right">
              <span>Average generation time: &lt; 2s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryBuilder;