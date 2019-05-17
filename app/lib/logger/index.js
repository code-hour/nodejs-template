const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file/index');
const CONFIG = require('./logger-config');

const { combine, timestamp, label } = format;
const { printf, colorize, simple } = format;
const myFormat = printf(({
                           level,
                           message,
                           label,
                           timestamp,
                         }) => `${timestamp} [${label}] ['app'] ${level}: ${message}`);

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info) => {
  if (info.private) { return false; }
  return info;
});

// define the custom settings for each transport (file, console)
const options = {
  application: {
    level: CONFIG[process.env.NODE_ENV].log.level,
    filename: CONFIG[process.env.NODE_ENV].log.applicationFile,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine(
      ignorePrivate(),
      label({ label: CONFIG.log_label }),
      timestamp(),
      format.json(),
    ),
  },
  exception: {
    level: CONFIG[process.env.NODE_ENV].log.level,
    filename: CONFIG[process.env.NODE_ENV].log.errorFile,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine(
      ignorePrivate(),
      label({ label: CONFIG.log_label }),
      timestamp(),
      format.json(),
    ),
  },
  console: {
    level: CONFIG[process.env.NODE_ENV].log.level,
    handleExceptions: true,
    format: combine(
      label({ label: CONFIG.log_label }),
      colorize(),
      simple(),
      timestamp(),
      myFormat,
    ),
  },
};

const applicationTransports = [
  new transports.DailyRotateFile(options.application),
  new transports.Console(options.console),
];

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  transports: applicationTransports,
  exceptionHandlers: [
    new transports.DailyRotateFile(options.exception),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    logger.info(message);
    logger.info(encoding);
  },
};

module.exports = logger;
