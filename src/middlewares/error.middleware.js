const createLog = require("../utils/createLog.js");

function errorMiddleware(error, req, res, next) {
    let message = "Internal Server Error";
    let code = 500;

    if (error) {
        message = error.message;
        code = error.code || 500;
    } else {
        message = "Internal Server Error";
        code = 500;
    }

    // const message =
    //     typeof error.message === "string"
    //         ? error.message
    //         : "Internal Server Error";
    // const code = error.code || 500;

    createLog("error", message, req, {
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
