const winston = require('winston');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

const logStream = fs.createWriteStream(path.join(__dirname, '../../logs/access.log'), { flags: 'a' });
const logMiddleware = morgan('combined', { stream: logStream });

module.exports = { logger, logMiddleware };