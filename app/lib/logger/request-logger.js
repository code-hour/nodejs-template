const morgan = require('morgan');
const logger = require('./index');

// const format = ':requestId :method :url :status :response-time ms';
// morgan.token('requestId', request => request.id);

morgan.token('requestId', request => request.correlationId());
const format = ':method :url :status :response-time ms';

const options = {
  // stream: logger.stream,
  stream: {
    write: message => logger.info(message.trim()),
  },
};

module.exports = morgan(format, options);
