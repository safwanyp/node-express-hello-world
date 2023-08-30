function createError(code, message) {
    const error = new Error(message);
    error.code = code;

    return error;
}

export default createError;
