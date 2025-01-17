const bunyan = require('bunyan');
const fs = require('fs');
const path = require('path');

const logDirectory = process.env.LOG_DIR || path.resolve(__dirname, 'logs');

try {
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
}
catch (e) {
    console.log(`Cannot create log directory: ${e}`);
}

const logger = bunyan.createLogger({
    name: 'react-starter-backend',
    streams: [{
        stream: process.stdout,
    }, {
        type: 'rotating-file',
        path: logDirectory + '/logs.log',
        period: '7d',
        count: 53,
    }]
});

module.exports = logger;

module.exports.stream = {
    write: function(message) {
        logger.info(message);
    }
};

// Logging Levels: fatal, error, warn, info, debug, trace
