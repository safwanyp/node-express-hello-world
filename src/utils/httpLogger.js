const morgan = require("morgan");
const json = require("morgan-json");
const logger = require("./logger.js");

morgan.token("requestId", (req) => req.requestId);

// Define a token for the tracing ID
morgan.token("tracingId", (req) => req.tracingId);

const format = json({
    method: ":method",
    url: ":url",
    status: ":status",
    contentLength: ":res[content-length]",
    responseTime: ":response-time",
    requestId: ":requestId",
    tracingId: ":tracingId",
});

const httpLogger = morgan(format, {
    stream: {
        write: (message) => {
            const {
                method,
                url,
                status,
                contentLength,
                responseTime,
                requestId,
                tracingId,
            } = JSON.parse(message);

            logger.info("Morgan HTTP Log", {
                timestamp: new Date().toString(),
                method,
                url,
                status: Number(status),
                contentLength,
                responseTime: Number(responseTime),
                requestId,
                tracingId,
            });
        },
    },
});

module.exports = httpLogger;
