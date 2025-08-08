const dotenv = require('dotenv');

dotenv.config();

// Server configuration
const PORT = process.env.PORT || 3002;
const API_KEY = process.env.API_KEY || '';
const MAX_REQUEST_SIZE = '10mb';

// Local LLM Server configuration
const LLM_SERVER_URL = process.env.LLM_SERVER_URL || 'http://127.0.0.1:1234';
const LLM_TIMEOUT = 60000; // 60 seconds

// Supported endpoints
const SUPPORTED_ENDPOINTS = [
  'GET /v1/models',
  'POST /v1/chat/completions',
  'POST /v1/completions',
  'POST /v1/embeddings'
];

module.exports = {
  PORT,
  API_KEY,
  MAX_REQUEST_SIZE,
  LLM_SERVER_URL,
  LLM_TIMEOUT,
  SUPPORTED_ENDPOINTS
};
