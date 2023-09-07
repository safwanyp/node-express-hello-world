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
            type: ["array", "string"],
            items: {
                type: "object",
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
    },
    required: ["status", "message", "code"],
};

const ajv = new Ajv();
const validateResponse = ajv.compile(schema);

function validateGetMessagesResponse(responseObject, req, res, next) {
    if (responseObject.code >= 400) {
        next(responseObject);
        return;
    }

    const valid = validateResponse(responseObject);

    if (!valid) {
        console.error(
            "Response schema validation failed",
            validateResponse.errors,
        );
    }

    res.status(responseObject.code).json(responseObject);

    next();
}

export default validateGetMessagesResponse;
