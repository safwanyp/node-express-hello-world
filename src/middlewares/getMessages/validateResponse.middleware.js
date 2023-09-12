const Ajv = require("ajv");
const logger = require("../../utils/logger.js");

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
            type: ["array", "string"],
            items: {
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
        },
    },
    required: ["status", "message", "code"],
};

const ajv = new Ajv();
const validateResponse = ajv.compile(schema);

function validateGetMessagesResponse(responseObject, req, res, next) {
    logger.info(`Validating response body for GET ${req.originalUrl}`, {
        body: responseObject,
    });

    if (responseObject.code >= 400) {
        next(responseObject);
        return;
    }

    const valid = validateResponse(responseObject);

    if (!valid) {
        logger.error("Response schema validation failed", {
            errors: validateResponse.errors,
            body: responseObject,
        });

        console.error(
            "Response schema validation failed",
            validateResponse.errors,
        );
    } else {
        logger.info("Response body is valid", {
            body: responseObject,
        });
    }

    res.status(responseObject.code).json(responseObject);

    next();
}

module.exports = validateGetMessagesResponse;
