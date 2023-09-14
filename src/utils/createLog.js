const logger = require("./logger");

function createLog(level, message, req, meta = {}) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        // requestId: req.requestId,
        // tracingId: req.tracingId,
        meta: meta,
    };

    logger.log(level, message, logEntry);
}

module.exports = createLog;
