const {createLogger, format} = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const log = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new WinstonDailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'debug'
    })
  ]
});

module.exports = log;