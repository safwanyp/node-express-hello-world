const {
    createMessageRequestSchema,
} = require("./middlewares/createMessage/validateRequest.middleware");
const {
    createMessageResponseSchema,
} = require("./middlewares/createMessage/validateResponse.middleware");
const {
    getMessagesResponseSchema,
} = require("./middlewares/getMessages/validateResponse.middleware");
const {
    getMessageResponseSchema,
} = require("./middlewares/getMessageById/validateResponse.middleware");
const {
    getMessageRequestSchema,
} = require("./middlewares/getMessageById/validateRequest.middleware");
const {
    loginRequestSchema,
} = require("./middlewares/login/validateRequest.middleware");
const {
    loginResponseSchema,
} = require("./middlewares/login/validateResponse.middleware");
const {
    registerRequestSchema,
} = require("./middlewares/register/validateRequest.middleware");
const {
    registerResponseSchema,
} = require("./middlewares/register/validateResponse.middleware");

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3080";

const genericSchema = {
    type: "object",
    properties: {
        code: {
            type: "number",
        },
        status: {
            type: "string",
        },
        message: {
            type: "string",
        },
    },
    required: ["code", "status", "message"],
};

const swaggerSpecs = {
    openapi: "3.0.0",
    tags: [
        {
            name: "Messages",
            description: "Endpoints for message-specific actions",
        },
        {
            name: "Users",
            description: "Endpoints for user-specific actions",
        },
    ],
    info: {
        title: "Hello World API",
        version: "1.0.0",
        description:
            "Simple Express API with JSON Schema validation and Swagger docs",
    },
    servers: [
        {
            url: SERVER_URL,
        },
    ],
    paths: {},
};

swaggerSpecs.paths["/messages"] = {
    post: {
        tags: ["Messages"],
        summary: "Create a new message",
        requestBody: {
            content: {
                "application/json": {
                    schema: createMessageRequestSchema,
                },
            },
        },
        responses: {
            201: {
                description: "Message created successfully",
                content: {
                    "application/json": {
                        schema: createMessageResponseSchema,
                    },
                },
            },
        },
    },
    get: {
        tags: ["Messages"],
        summary: "Get all messages",
        responses: {
            200: {
                description: "Messages retrieved successfully",
                content: {
                    "application/json": {
                        schema: getMessagesResponseSchema,
                    },
                },
            },
        },
    },
};

swaggerSpecs.paths["/messages/{id}"] = {
    get: {
        tags: ["Messages"],
        summary: "Get a message by ID",
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID of the message to retrieve",
                required: true,
                schema: {
                    type: "number",
                },
            },
        ],
        requestBody: getMessageRequestSchema,
        responses: {
            200: {
                description: "Message retrieved successfully",
                content: {
                    "application/json": {
                        schema: getMessageResponseSchema,
                    },
                },
            },
            404: {
                description: "Message not found",
                content: {
                    "application/json": {
                        schema: genericSchema,
                    },
                },
            },
        },
    },
};

swaggerSpecs.paths["/users/login"] = {
    post: {
        tags: ["Users"],
        summary: "Create a session for a user",
        requestBody: {
            content: {
                "application/json": {
                    schema: loginRequestSchema,
                },
            },
        },
        responses: {
            201: {
                description: "Session created successfully",
                content: {
                    "application/json": {
                        schema: loginResponseSchema,
                    },
                },
            },
        },
    },
};

swaggerSpecs.paths["/users/register"] = {
    post: {
        tags: ["Users"],
        summary: "Create an account for a user",
        requestBody: {
            content: {
                "application/json": {
                    schema: registerRequestSchema,
                },
            },
        },
        responses: {
            201: {
                description: "Account created successfully",
                content: {
                    "application/json": {
                        schema: registerResponseSchema,
                    },
                },
            },
        },
    },
};

module.exports = swaggerSpecs;
