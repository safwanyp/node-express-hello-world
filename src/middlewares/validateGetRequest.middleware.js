import Ajv from "ajv";
import getRequestSchema from "../schemas/GET_request.js";
import { StatusCodes } from "http-status-codes";

const ajv = new Ajv();
const validateRequest = ajv.compile(getRequestSchema);

function validateMessageGetRequest(req, res, next) {
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

export default validateMessageGetRequest;
