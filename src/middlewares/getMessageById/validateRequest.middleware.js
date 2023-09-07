import Ajv from "ajv";
import { StatusCodes } from "http-status-codes";

const schema = {
    type: "object",
    properties: {},
    additionalProperties: false,
};

const ajv = new Ajv();
const validateRequest = ajv.compile(schema);

function validateGetMessageRequest(req, res, next) {
    const valid = validateRequest(req.body);

    if (!valid) {
        next({
            code: StatusCodes.BAD_REQUEST,
            status: "Error",
            message: "Request body should be empty",
        });
    }

    next();
}

export default validateGetMessageRequest;
