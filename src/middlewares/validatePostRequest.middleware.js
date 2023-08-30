import Ajv from "ajv";
import postRequestSchema from "../schemas/POST_request.js";

const ajv = new Ajv();

const validateRequest = ajv.compile(postRequestSchema);

function validateMessagePostRequest(req, res, next) {
    const valid = validateRequest(req.body);

    if (!valid) {
        return res.status(400).json({
            status: "Error",
            message: validateRequest.errors[0].message,
        });
    }

    next();
}

export default validateMessagePostRequest;
