const Ajv = require("ajv");
const logger = require("../../utils/logger.js");

const schema = {
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
const validateRequest = ajv.compile(schema);

function validateCreateMessageRequest(req, res, next) {
    logger.info(`Validating request body for POST ${req.originalUrl}`, {
        body: req.body,
    });

    const valid = validateRequest(req.body);

    if (!valid) {
        logger.error("Error validating request body", {
            errors: validateRequest.errors,
            body: req.body,
        });

        const response = {
            code: 400,
            status: "Error",
            message: validateRequest.errors[0].message,
        };

        next(response);
        return;
    } else {
        logger.info("Request body is valid", {
            body: req.body,
        });
    }

    next();
}

module.exports = validateCreateMessageRequest;
