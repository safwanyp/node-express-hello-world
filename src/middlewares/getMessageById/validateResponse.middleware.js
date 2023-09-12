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
            type: ["object", "string"],
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
    required: ["status", "message", "code"],
};

const ajv = new Ajv();
const validateResponse = ajv.compile(schema);

function validateGetMessageResponse(responseObject, req, res, next) {
    logger.info(`Validating response body for GET ${req.originalUrl}`, {
        body: responseObject,
    });

    if (responseObject.code >= 500) {
        next(responseObject);
        return;
    }

    const valid = validateResponse(responseObject);

    if (!valid) {
        // Log the error for debugging cuz idk what else to do
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

module.exports = validateGetMessageResponse;
