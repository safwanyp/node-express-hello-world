const express = require("express");
const validateGetMessageResponse = require("../middlewares/getMessageById/validateResponse.middleware.js");
const validateGetMessagesResponse = require("../middlewares/getMessages/validateResponse.middleware.js");
const validateGetMessageRequest = require("../middlewares/getMessageById/validateRequest.middleware.js");
const validateCreateMessageResponse = require("../middlewares/createMessage/validateResponse.middleware.js");
const validateCreateMessageRequest = require("../middlewares/createMessage/validateRequest.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const messageController = require("../controllers/message.controller.js");

const messageRouter = express.Router();

messageRouter.get(
    "/",
    validateGetMessageRequest,
    authMiddleware,
    messageController.getMessages,
    validateGetMessagesResponse,
);

messageRouter.get(
    "/:id",
    validateGetMessageRequest,
    authMiddleware,
    messageController.getMessageById,
    validateGetMessageResponse,
);

messageRouter.post(
    "/",
    validateCreateMessageRequest,
    authMiddleware,
    messageController.createMessage,
    validateCreateMessageResponse,
);

module.exports = messageRouter;
