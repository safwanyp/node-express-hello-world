const Ajv = require("ajv");
const createLog = require("../../utils/createLog");
const { StatusCodes } = require("http-status-codes");

const registerResponseSchema = {
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
                        username: {
                            type: "string",
                        },
                    },
                    required: ["username", "id"],
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
const validateResponse = ajv.compile(registerResponseSchema);

async function validateRegisterResponse(responseObject, req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: responseObject,
    };

    if (responseObject.code >= StatusCodes.BAD_REQUEST) {
        // createLog("error", responseObject.message, req, meta);
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

module.exports = { validateRegisterResponse, registerResponseSchema };
