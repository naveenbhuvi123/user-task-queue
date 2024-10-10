const { createLogger, format, transports } = require('winston');
const path = require('path');

// Create a new logger instance to store logs in the logs directory
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, 'logs', 'task.log'),
      level: 'info',
    }),
  ],
});

module.exports = logger;
