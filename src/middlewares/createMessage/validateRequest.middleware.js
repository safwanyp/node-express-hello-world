import Ajv from "ajv";

const schema = {
    type: "object",
    properties: {
        created_by: {
            type: "string",
        },
        message: {
            type: "string",
        },
    },
    required: ["created_by", "message"],
};

const ajv = new Ajv();
const validateRequest = ajv.compile(schema);

function validateCreateMessageRequest(req, res, next) {
    const valid = validateRequest(req.body);

    if (!valid) {
        const response = {
            code: 400,
            status: "Error",
            message: validateRequest.errors[0].message,
        };

        next(response);
        return;
    }

    next();
}

export default validateCreateMessageRequest;
