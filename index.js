const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const constants = require('./config/constants');
const logger = require('./utils/logger');

const app = express();
const PORT = constants.PORT;

// Middleware
app.use(cors());
app.use(express.json({ limit: constants.MAX_REQUEST_SIZE }));
app.use(express.urlencoded({ extended: true, limit: constants.MAX_REQUEST_SIZE }));

// Mount routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  logger.info(`LLM Proxy Server running on port ${PORT}`);
});
