// Request validation middleware
const validateRequest = (req, res, next) => {
  // Basic request validation
  if (!req.body) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Request body is required'
    });
  }

  // Add timestamp to request
  req.timestamp = new Date().toISOString();
  
  // Log request for debugging
  console.log(`[${req.timestamp}] ${req.method} ${req.originalUrl}`);
  
  next();
};

module.exports = {
  validateRequest
};