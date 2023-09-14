const createLog = require("../utils/createLog.js");

function errorMiddleware(error, req, res, next) {
    const message =
        typeof error.message === "string"
            ? error.message
            : "Internal Server Error";
    const code = error.code || 500;

    createLog("error", `[ERROR HANDLER] ${message}`, req, {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
    });

    res.status(code).json({
        code: code,
        status: "Error",
        message: message,
    });

    next();
}

module.exports = errorMiddleware;
