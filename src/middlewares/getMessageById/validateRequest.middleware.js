const Ajv = require("ajv");
const { StatusCodes } = require("http-status-codes");
const createLog = require("../../utils/createLog.js");

const schema = {
    type: "object",
    properties: {},
};

const ajv = new Ajv();
const validateRequest = ajv.compile(schema);

function validateGetMessageRequest(req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
    };

    createLog("info", "Validating request body", req, meta);
    const valid = validateRequest(req.body);

    if (!valid) {
        meta.errors = validateRequest.errors;

        createLog("error", "Request body is invalid", req, meta);

        next({
            code: StatusCodes.BAD_REQUEST,
            status: "Error",
            message: "Request body should be empty",
        });

        return;
    }

    createLog("info", "Request body is valid", req, meta);

    next();
}

module.exports = validateGetMessageRequest;
