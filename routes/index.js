const express = require('express');
const router = express.Router();
const llmRoutes = require('./llm');
const {
  validateApiKey
} = require('../middlewares/auth');

// Mount LLM routes with API key validation
router.use('/', validateApiKey, llmRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'LLM Proxy Server',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
