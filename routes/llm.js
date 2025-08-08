const express = require('express');
const router = express.Router();
const {
    getModels,
    createChatCompletion,
    createCompletion,
    createEmbedding
} = require('../controllers/LLMController');

// OpenAI compatible endpoints
router.get('/v1/models', getModels);
router.post('/v1/chat/completions', createChatCompletion);
router.post('/v1/completions', createCompletion);
router.post('/v1/embeddings', createEmbedding);

module.exports = router;
