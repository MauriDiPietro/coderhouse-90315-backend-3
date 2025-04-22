import winston from 'winston';
import 'winston-mongodb'

const logConfig = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/winston-log.log',
            level: 'info',
        }),
        winston.add(
            new winston.transports.MongoDB({
                db: 'mongodb://localhost:27017/coderhouse',
                collection: 'logs',
                tryReconnect: true,
                level: 'error',
            })
        )
    ]
}

const logger = winston.createLogger(logConfig);

logger.level = 'silly';

logger.silly('Hello world!');
logger.debug('Hello world!');
logger.verbose('Hello world!');
logger.info('Hello world!');
logger.http('Hello world!');
logger.warn('Hello world!');
logger.error('Hello world!');




