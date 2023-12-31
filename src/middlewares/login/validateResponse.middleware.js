const Ajv = require("ajv");
const createLog = require("../../utils/createLog");
const { StatusCodes } = require("http-status-codes");

const loginResponseSchema = {
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
                        username: {
                            type: "string",
                        },
                        token: {
                            type: "string",
                        },
                    },
                    required: ["username", "token"],
                },
                {
                    type: "string",
                },
            ],
        },
    },
    additionalProperties: false,
    required: ["status", "message", "code"],
};

const ajv = new Ajv();
const validateResponse = ajv.compile(loginResponseSchema);

async function validateLoginResponse(responseObject, req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: responseObject,
    };

    if (responseObject.code >= StatusCodes.BAD_REQUEST) {
        createLog("error", responseObject.message, req, meta);
        next(responseObject);
        return;
    }

    createLog("info", "Validating response body", req, meta);

    const valid = await validateResponse(responseObject);

    if (!valid) {
        createLog("error", "Response body is invalid", req, meta);
    } else {
        createLog("info", "Response body is valid", req, meta);
    }

    res.status(responseObject.code).json(responseObject);
    next();
}

module.exports = { validateLoginResponse, loginResponseSchema };
