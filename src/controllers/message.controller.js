import { StatusCodes } from "http-status-codes";
import * as messageService from "../services/message.service.js";

export async function getMessageById(req, res, next) {
    try {
        const message = await messageService.getMessageById(req.params.id);
        res.status(StatusCodes.OK).json(message);
    } catch (err) {
        next(err);
    }
}

export async function createMessage(req, res) {
    const message = await messageService.createMessage(req.body);
    res.status(StatusCodes.CREATED).json(message);
}

export async function getMessages(req, res) {
    const messages = await messageService.getMessages();
    if (messages !== null) {
        res.status(StatusCodes.OK).json(messages);
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Messages not found",
        });
    }
}
