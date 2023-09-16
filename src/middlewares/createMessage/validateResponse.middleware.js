const Ajv = require("ajv");
const createLog = require("../../utils/createLog");
const { StatusCodes } = require("http-status-codes");
const statusCodes = require("../../utils/statusCodes");

const createMessageResponseSchema = {
    type: "object",
    properties: {
        code: {
            type: "number",
            enum: statusCodes,
        },
        status: {
            type: "string",
        },
        message: {
            if: { type: "object" },
            then: {
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
            else: {
                type: "string",
            },
        },
    },
    required: ["status", "message", "code"],
};

const ajv = new Ajv();
const validateResponse = ajv.compile(createMessageResponseSchema);

function validateCreateMessageResponse(responseObject, req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: responseObject,
    };

    createLog("info", "Validating response body", req, meta);

    if (responseObject.code >= StatusCodes.INTERNAL_SERVER_ERROR) {
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

module.exports = { validateCreateMessageResponse, createMessageResponseSchema };
