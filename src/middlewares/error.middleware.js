const logger = require("../utils/logger.js");

function errorMiddleware(error, req, res, next) {
    const message =
        typeof error.message === "string"
            ? error.message
            : "Something went wrong";
    const code = error.code || 500;

    logger.error("Error caugth by middleware", {
        code: code,
        status: "Error",
        message: message,
    });

    res.status(code).json({
        code: code,
        status: "Error",
        message: message,
    });

    next();
}

module.exports = errorMiddleware;
