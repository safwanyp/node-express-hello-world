const responseSchema = {
    type: "object",
    properties: {
        status: {
            type: "string",
        },
        message: {
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
    required: ["status", "message"],
};

export default responseSchema;
