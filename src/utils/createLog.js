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

    const dataBuffer = Buffer.from(JSON.stringify(logEntry));
    pubsub.topic(topicName).publish(dataBuffer);
}

module.exports = createLog;
