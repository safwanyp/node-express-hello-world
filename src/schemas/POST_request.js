const postRequestSchema = {
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

export default postRequestSchema;
