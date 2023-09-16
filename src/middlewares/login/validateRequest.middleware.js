const Ajv = require("ajv");
const createLog = require("../../utils/createLog");
const { StatusCodes } = require("http-status-codes");

const loginRequestSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
        },
        password: {
            type: "string",
        },
    },
    required: ["username", "password"],
};

const ajv = new Ajv();
const validateRequest = ajv.compile(loginRequestSchema);

function validateLoginRequest(req, res, next) {
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

        return next(response);
    }

    createLog("info", "Request body is valid", req, meta);
    return next();
}

module.exports = { validateLoginRequest, loginRequestSchema };
