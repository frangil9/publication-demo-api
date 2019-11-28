const winston = require('winston');
const config = require('../config');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.printf(log => {
                    return `${log.timestamp} | ${log.level}: ${log.message}`;
                })
            )
        }),
        new winston.transports.File({
            level: 'info',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(),
                winston.format.printf(log => {
                    return `${log.timestamp} | ${log.level}: ${log.message}`;
                })
            ),
            maxsize: 5120000,
            maxFiles: 5,
            filename: config.dirname_logger
        })
    ]
})

module.exports = logger;