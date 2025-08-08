const LLMProxyService = require('../services/LLMProxyService');
const logger = require('../utils/logger');

const getModels = async (req, res) => {
  try {
    logger.info('GET /v1/models request received');
    const result = await LLMProxyService.getModels();
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error('Error in getModels controller', { error: error.message });
    res.status(error.status || 500).json(error.data || { error: 'Internal server error' });
  }
};

const createChatCompletion = async (req, res) => {
  try {
    logger.info('POST /v1/chat/completions request received', {
      model: req.body.model,
      messagesCount: req.body.messages?.length
    });
    
    const result = await LLMProxyService.createChatCompletion(req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error('Error in createChatCompletion controller', { error: error.message });
    res.status(error.status || 500).json(error.data || { error: 'Internal server error' });
  }
};

const createCompletion = async (req, res) => {
  try {
    logger.info('POST /v1/completions request received', {
      model: req.body.model,
      prompt: req.body.prompt?.substring(0, 100) + '...'
    });
    
    const result = await LLMProxyService.createCompletion(req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error('Error in createCompletion controller', { error: error.message });
    res.status(error.status || 500).json(error.data || { error: 'Internal server error' });
  }
};

const createEmbedding = async (req, res) => {
  try {
    logger.info('POST /v1/embeddings request received', {
      model: req.body.model,
      inputType: typeof req.body.input
    });
    
    const result = await LLMProxyService.createEmbedding(req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error('Error in createEmbedding controller', { error: error.message });
    res.status(error.status || 500).json(error.data || { error: 'Internal server error' });
  }
};

module.exports = {
  getModels,
  createChatCompletion,
  createCompletion,
  createEmbedding
};