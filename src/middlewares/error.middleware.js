function errorMiddleware(error, req, res, next) {
    const message = error.message || "Something went wrong.";
    const code = error.code || 500;

    res.status(code).json({
        code: code,
        message: message,
    });

    next();
}

export default errorMiddleware;
