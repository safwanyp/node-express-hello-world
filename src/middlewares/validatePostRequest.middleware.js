import Ajv from "ajv";
import { requestSchema } from "../schemas/POST_request.json";

const ajv = new Ajv();

const validateRequest = ajv.compile(requestSchema);

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
