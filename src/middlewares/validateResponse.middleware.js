import Ajv from "ajv";
import { responseSchema } from "../schemas/response.json";

const ajv = new Ajv();

const validateResponse = ajv.compile(responseSchema);

function validateMessageResponse(req, res, next) {
    const valid = validateResponse(res.body);

    if (!valid) {
        // Log the error for debugging cuz idk what else to do
        console.error(
            "Response schema validation failed",
            validateResponse.errors,
        );
    }

    next();
}

export default validateMessageResponse;
