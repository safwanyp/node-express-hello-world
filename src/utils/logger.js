import winston from "winston";
import __dirname from "./dirname.js";
import { LoggingWinston } from "@google-cloud/logging-winston";

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

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
        loggingWinston,
    ],
    exitOnError: false,
});

export default logger;
