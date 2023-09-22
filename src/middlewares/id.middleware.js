const { v4: uuidv4 } = require("uuid");

function requestIdMiddleware(req, res, next) {
    req.requestId = uuidv4();

    res.setHeader("X-Request-ID", req.requestId);

    next();
}

module.exports = requestIdMiddleware;
