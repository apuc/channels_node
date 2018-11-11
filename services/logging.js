const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const log = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new WinstonDailyRotateFile({
            filename: 'logs/log-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'debug'
        })
    ]
});

module.exports = log;