import express from "express";
import * as messageController from "../controllers/message.controller.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import validateMessagePostRequest from "../middlewares/validatePostRequest.middleware.js";
import validateMessageResponse from "../middlewares/validateResponse.middleware.js";
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
    errorMiddleware,
);

messageRouter.post(
    "/",
    validateMessagePostRequest,
    messageController.createMessage,
    validateMessageResponse,
);

export default messageRouter;
