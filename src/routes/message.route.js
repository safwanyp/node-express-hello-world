import express from "express";
import * as messageController from "../controllers/message.controller.js";
import validateGetMessageResponse from "../middlewares/getMessageById/validateResponse.middleware.js";
import validateGetMessagesResponse from "../middlewares/getMessages/validateResponse.middleware.js";
import validateGetMessageRequest from "../middlewares/getMessageById/validateRequest.middleware.js";
import validateCreateMessageResponse from "../middlewares/createMessage/validateResponse.middleware.js";
import validateCreateMessageRequest from "../middlewares/createMessage/validateRequest.middleware.js";

const messageRouter = express.Router();

messageRouter.get(
    "/",
    validateGetMessageRequest,
    messageController.getMessages,
    validateGetMessagesResponse,
);

messageRouter.get(
    "/:id",
    validateGetMessageRequest,
    messageController.getMessageById,
    validateGetMessageResponse,
);

messageRouter.post(
    "/",
    validateCreateMessageRequest,
    messageController.createMessage,
    validateCreateMessageResponse,
);

export default messageRouter;
