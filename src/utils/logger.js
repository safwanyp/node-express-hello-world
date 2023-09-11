import winston from "winston";
import __dirname from "./dirname.js";
import { LoggingWinston } from "@google-cloud/logging-winston";
import dotenv from "dotenv";

dotenv.config();

const loggingWinston = new LoggingWinston();

const transports = [];

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

switch (process.env.NODE_ENV) {
    case "PROD":
        transports.push(
            new winston.transports.Console(options.console),
            loggingWinston,
        );
        break;
    case "DEV":
        transports.push(
            new winston.transports.Console(options.console),
            new winston.transports.File(options.file),
        );
}

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: transports,
    exitOnError: false,
});

export default logger;
