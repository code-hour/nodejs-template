const appRoot = require('app-root-path');
const fs = require('fs');

let logDir;
if (process.env.NODE_ENV === 'development') {
  logDir = `${appRoot}/log`;
} else {
  logDir = '/var/log';
}

const CONFIG = {
  log_label: 'nodejs-template',
  development: {
    log: {
      level: 'silly',
      applicationFile: `${logDir}/%DATE%-app.log`,
      errorFile: `${logDir}/%DATE%-exceptions.log`,
      database: true,
    },
  },
  staging: {
    log: {
      level: 'debug',
      applicationFile: `${logDir}/%DATE%-app.log`,
      errorFile: `${logDir}/%DATE%-exceptions.log`,
      database: true,
    },
  },
  production: {
    log: {
      level: 'info',
      applicationFile: `${logDir}/%DATE%-app.log`,
      errorFile: `${logDir}/%DATE%-exceptions.log`,
      database: true,
    },
  },
};

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

module.exports = CONFIG;
