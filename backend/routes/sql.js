const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');
const { validateRequest } = require('../middleware/validation');

// Generate SQL from natural language
router.post('/generate', validateRequest, sqlController.generateSQL);

// Validate SQL query
router.post('/validate', validateRequest, sqlController.validateSQL);

// Optimize SQL query
router.post('/optimize', validateRequest, sqlController.optimizeSQL);

// Get SQL suggestions
router.post('/suggest', validateRequest, sqlController.getSuggestions);

module.exports = router;