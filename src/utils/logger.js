const winston = require("winston");
const { LoggingWinston } = require("@google-cloud/logging-winston");
const dotenv = require("dotenv");

dotenv.config();

const loggingWinston = new LoggingWinston();

const options = {
    file: {
        level: "info",
        filename: `${__dirname}/../logs/app.log`,
        handleExceptions: true,
        json: true,
        colorize: false,
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const transports = [new winston.transports.Console(options.console)];

switch (process.env.NODE_ENV) {
    case "PROD":
        transports.push(loggingWinston);
        break;
    case "DEV":
        transports.push(new winston.transports.File(options.file));
        break;
    default:
        break;
}

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: transports,
    exitOnError: false,
});

module.exports = logger;
