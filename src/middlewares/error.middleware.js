function errorMiddleware(error, req, res, next) {
    const message =
        typeof error.message === "string"
            ? error.message
            : "Something went wrong";
    const code = error.code || 500;

    res.status(code).json({
        code: code,
        status: "Error",
        message: message,
    });

    next();
}

export default errorMiddleware;
