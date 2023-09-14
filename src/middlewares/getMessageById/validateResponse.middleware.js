const Ajv = require("ajv");
const createLog = require("../../utils/createLog.js");

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
            if: { type: "object" },
            then: {
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

function validateGetMessageResponse(responseObject, req, res, next) {
    const meta = {
        path: req.path,
        method: req.method,
        body: responseObject,
    };

    createLog("info", "Validating response body", req, meta);

    if (responseObject.code >= 500) {
        createLog("error", "Response body is invalid", req, meta);
        next(responseObject);
        return;
    }

    const valid = validateResponse(responseObject);

    if (!valid) {
        createLog("error", "Response body is invalid", req, meta);
    } else {
        createLog("info", "Response body is valid", req, meta);
    }

    res.status(responseObject.code).json(responseObject);

    next();
}

module.exports = validateGetMessageResponse;
