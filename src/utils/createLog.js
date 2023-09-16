const logger = require("./logger");
const { PubSub } = require("@google-cloud/pubsub");

const pubsub = new PubSub();
const topicName = "logs-topic";

function createLog(level, message, req, meta = {}) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
        tracingId: req.tracingId,
        meta: meta,
    };

    logger.log(level, message, logEntry);

    const logToInsert = {
        level: level,
        message: message,
        timestamp: logEntry.timestamp,
        requestId: logEntry.requestId,
        tracingId: logEntry.tracingId,
        meta: JSON.stringify(logEntry.meta),
    };

    const dataBuffer = Buffer.from(JSON.stringify(logToInsert));
    pubsub.topic(topicName).publish(dataBuffer);
}

module.exports = createLog;
