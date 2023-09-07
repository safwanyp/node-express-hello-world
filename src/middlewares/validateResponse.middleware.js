import Ajv from "ajv";
import responseSchema from "../schemas/response.js";

const ajv = new Ajv();

const validateResponse = ajv.compile(responseSchema);

function validateMessageResponse(responseObject, req, res, next) {
    if (responseObject.code >= 500) {
        next(responseObject);
        return;
    }

    const valid = validateResponse(responseObject);

    if (!valid) {
        // Log the error for debugging cuz idk what else to do
        console.error(
            "Response schema validation failed",
            validateResponse.errors,
        );
    }

    res.status(responseObject.code).json(responseObject);

    next();
}

export default validateMessageResponse;
