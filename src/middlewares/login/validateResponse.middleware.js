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
            if: { type: "object" },
            then: {
                properties: {
                    username: {
                        type: "string",
                    },
                    token: {
                        type: "string",
                    },
                },
                required: ["username", "token"],
            },
            else: {
                type: "string",
            },
        },
    },
    additionalProperties: false,
    required: ["status", "message", "code"],
};

const ajv = new Ajv();
const validateResponse = ajv.compile(schema);

function validateLoginResponse(responseObject, req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: responseObject,
    };

    if (responseObject.code >= 400) {
        createLog("error", responseObject.message, req, meta);
        next(responseObject);
        return;
    }

    createLog("info", "Validating response body", req, meta);

    const valid = validateResponse(responseObject);

    if (!valid) {
        createLog("error", "Response body is invalid", req, meta);
    } else {
        createLog("info", "Response body is valid", req, meta);
    }

    res.status(responseObject.code).json(responseObject);
    next();
}

module.exports = validateLoginResponse;
