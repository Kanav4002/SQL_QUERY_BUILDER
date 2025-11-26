import React, { useState } from 'react';
import './QueryBuilder.css';

const QueryBuilder = () => {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const generatedSQL = `-- Generated SQL will
appear here

SELECT
  c.id
  -- customer identifier,
  c.email,
  c.country,
  SUM(o.total_amount) AS
  total_revenue
FROM orders o
JOIN customers c
  ON o.customer_id = c.id
WHERE
  o.created_at >= NOW() -
  INTERVAL '30 days'
GROUP BY
  c.id, c.email, c.country
ORDER BY
  total_revenue DESC
LIMIT 10;`;

  const formatSQL = (sql) => {
    return sql
      .replace(/(SELECT|FROM|JOIN|WHERE|GROUP BY|ORDER BY|LIMIT|AS|SUM|NOW)/g, '<span class="sql-keyword">$1</span>')
      .replace(/(--[^\n]*)/g, '<span class="sql-comment">$1</span>')
      .replace(/(SUM|NOW)/g, '<span class="sql-function">$1</span>');
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
                navigator.clipboard.writeText(generatedSQL);
                alert('SQL copied to clipboard!');
              }}
            >
              📋 Copy SQL
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