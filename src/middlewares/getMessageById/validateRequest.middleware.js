import Ajv from "ajv";
import { StatusCodes } from "http-status-codes";
import logger from "../../utils/logger.js";

const schema = {
    type: "object",
    properties: {},
    additionalProperties: false,
};

const ajv = new Ajv();
const validateRequest = ajv.compile(schema);

function validateGetMessageRequest(req, res, next) {
    logger.info(`Validating request body for GET ${req.originalUrl}`, {
        body: req.body,
    });

    const valid = validateRequest(req.body);

    if (!valid) {
        logger.error("Error validating request body", {
            errors: validateRequest.errors,
            body: req.body,
        });

        next({
            code: StatusCodes.BAD_REQUEST,
            status: "Error",
            message: "Request body should be empty",
        });
        return;
    }

    logger.info("Request body is valid", {
        body: req.body,
    });

    next();
}

export default validateGetMessageRequest;