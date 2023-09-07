import Ajv from "ajv";

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

function validateCreateMessageResponse(responseObject, req, res, next) {
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

export default validateCreateMessageResponse;
