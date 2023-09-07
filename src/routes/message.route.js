import express from "express";
import * as messageController from "../controllers/message.controller.js";
import validateMessagePostRequest from "../middlewares/validatePostRequest.middleware.js";
import validateGetMessageResponse from "../middlewares/validateGetMessageResponse.middleware.js";
import validateMessageGetRequest from "../middlewares/validateGetRequest.middleware.js";

const messageRouter = express.Router();

messageRouter.get(
    "/",
    validateMessageGetRequest,
    messageController.getMessages,
);

messageRouter.get(
    "/:id",
    validateMessageGetRequest,
    messageController.getMessageById,
    validateGetMessageResponse,
);

messageRouter.post(
    "/",
    validateMessagePostRequest,
    messageController.createMessage,
    validateGetMessageResponse,
);

export default messageRouter;
