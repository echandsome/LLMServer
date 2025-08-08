const axios = require('axios');
const constants = require('../config/constants');
const logger = require('../utils/logger');

class LLMProxyService {
  constructor() {
    this.llmServerUrl = constants.LLM_SERVER_URL;
    this.timeout = constants.LLM_TIMEOUT;
  }

  async proxyRequest(method, endpoint, data = null, headers = {}) {
    try {
      const url = `${this.llmServerUrl}${endpoint}`;
      
      logger.info(`Proxying request: ${method} ${endpoint}`, {
        url,
        hasData: !!data,
        headers: Object.keys(headers)
      });

      const config = {
        method,
        url,
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.data = data;
      }

      const response = await axios(config);
      
      logger.info(`Successfully proxied request: ${method} ${endpoint}`, {
        status: response.status,
        responseSize: JSON.stringify(response.data).length
      });

      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      logger.error(`Error proxying request: ${method} ${endpoint}`, {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });

      throw {
        status: error.response?.status || 500,
        data: error.response?.data || { error: 'Internal server error' },
        message: error.message
      };
    }
  }

  async getModels() {
    return this.proxyRequest('GET', '/v1/models');
  }

  async createChatCompletion(data) {
    return this.proxyRequest('POST', '/v1/chat/completions', data);
  }

  async createCompletion(data) {
    return this.proxyRequest('POST', '/v1/completions', data);
  }

  async createEmbedding(data) {
    return this.proxyRequest('POST', '/v1/embeddings', data);
  }

  isEndpointSupported(method, endpoint) {
    const supportedEndpoint = `${method} ${endpoint}`;
    return constants.SUPPORTED_ENDPOINTS.includes(supportedEndpoint);
  }
}

module.exports = new LLMProxyService();
