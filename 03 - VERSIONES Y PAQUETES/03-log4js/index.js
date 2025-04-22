import log4js from 'log4js';

log4js.configure({
    appenders: {
        fileAppender: { type: 'file', filename: './logs/logfile.log' },
        consoleAppender: { type: 'console' },
    },
    categories: {
        default: { appenders: ['fileAppender', 'consoleAppender'], level: 'info' },
        dev: { appenders: ['consoleAppender'], level: 'debug' },
        prod: { appenders: ['fileAppender'], level: 'error' },
    }
})

const ENV = 'dev'

export const logger = log4js.getLogger('dev');

if (ENV === 'prod') logger = log4js.getLogger('prod') 

// logger.level = 'info'

//console.log(".....")
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");


const getData = () => {
    try {
        throw new Error("Error de prueba");
    } catch (error) {
        logger.error(error.message)
        //..............
    }
}

getData()