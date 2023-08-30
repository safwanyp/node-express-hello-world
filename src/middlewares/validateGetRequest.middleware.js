import Ajv from "ajv";
import getRequestSchema from "../schemas/GET_request";

const ajv = new Ajv();
const validateRequest = ajv.compile(getRequestSchema);

function validateMessageGetRequest(req, res, next) {
    const valid = validateRequest(req.body);

    if (!valid) {
        return res.status(400).json({
            status: "Error",
            message: validateRequest.errors[0].message,
        });
    }

    next();
}

export default validateMessageGetRequest;
