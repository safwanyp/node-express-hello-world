const Ajv = require("ajv");
const createLog = require("../../utils/createLog");

const schema = {
    type: "object",
    properties: {
        code: {
            type: "number",
        },
        status: {
            type: "string",
        },
        message: {
            if: { type: "array" },
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
const validateResponse = ajv.compile(schema);

function validateGetMessagesResponse(responseObject, req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: responseObject,
    };

    createLog("info", "Validating response body", req, meta);

    if (responseObject.code >= 400) {
        next(responseObject);
        return;
    }

    const valid = validateResponse(responseObject);

    if (!valid) {
        createLog("debug", "Response body is invalid", req, meta);
    }

    createLog("info", "Response body is valid", req, meta);

    res.status(responseObject.code).json(responseObject);
    next();
}

module.exports = validateGetMessagesResponse;
