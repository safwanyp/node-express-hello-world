const Ajv = require("ajv");
const createLog = require("../../utils/createLog.js");
const { StatusCodes } = require("http-status-codes");

const getMessageResponseSchema = {
    type: "object",
    properties: {
        code: {
            type: "number",
        },
        status: {
            type: "string",
        },
        message: {
            oneOf: [
                {
                    type: "object",
                    properties: {
                        id: {
                            type: "number",
                        },
                        created_by: {
                            type: "string",
                        },
                        message: {
                            type: "string",
                        },
                    },
                    required: ["id", "created_by", "message"],
                },
                {
                    type: "string",
                },
            ],
        },
    },
    required: ["status", "message", "code"],
};

const ajv = new Ajv();
const validateResponse = ajv.compile(getMessageResponseSchema);

function validateGetMessageResponse(responseObject, req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: responseObject,
    };

    createLog("info", "Validating response body", req, meta);

    if (responseObject.code >= StatusCodes.BAD_REQUEST) {
        createLog("error", "Response body is invalid", req, meta);
        next(responseObject);
        return;
    }

    const valid = validateResponse(responseObject);

    if (!valid) {
        createLog("error", "Response body is invalid", req, meta);
    }

    createLog("info", "Response body is valid", req, meta);

    res.status(responseObject.code).json(responseObject);

    next();
}

module.exports = {
    validateGetMessageResponse,
    getMessageResponseSchema,
};
