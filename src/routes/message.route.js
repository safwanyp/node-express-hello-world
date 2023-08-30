import express from "express";
import * as messageController from "../controllers/message.controller.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/:id", messageController.getMessageById, errorMiddleware);
messageRouter.post("/", messageController.createMessage);
messageRouter.get("/", messageController.getMessages);

export default messageRouter;
