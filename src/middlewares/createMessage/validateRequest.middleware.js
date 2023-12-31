const Ajv = require("ajv");
const createLog = require("../../utils/createLog");
const { StatusCodes } = require("http-status-codes");

const createMessageRequestSchema = {
    type: "object",
    properties: {
        created_by: {
            type: "string",
        },
        message: {
            type: "string",
        },
    },
    required: ["created_by", "message"],
};

const ajv = new Ajv();
const validateRequest = ajv.compile(createMessageRequestSchema);

function validateCreateMessageRequest(req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
    };

    createLog("info", "Validating request body", req, meta);

    const valid = validateRequest(req.body);

    if (!valid) {
        createLog("error", "Request body is invalid", req, meta);

        const response = {
            code: StatusCodes.BAD_REQUEST,
            status: "Error",
            message: validateRequest.errors[0].message,
        };

        next(response);
        return;
    }

    createLog("info", "Request body is valid", req, meta);

    next();
}

module.exports = { validateCreateMessageRequest, createMessageRequestSchema };
