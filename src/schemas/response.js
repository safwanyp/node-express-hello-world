const responseSchema = {
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

export default responseSchema;
