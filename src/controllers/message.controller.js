import { StatusCodes } from "http-status-codes";
import * as messageService from "../services/message.service.js";

export async function getMessageById(req, res, next) {
    try {
        const message = await messageService.getMessageById(req.params.id);

        if (message) {
            const response = {
                code: StatusCodes.OK,
                status: "Success",
                message: message,
            };

            next(response);
        } else {
            next({
                code: StatusCodes.NOT_FOUND,
                status: "Error",
                message: "Message not found",
            });
        }
    } catch (err) {
        // throw server error for middleware to catch
        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

export async function createMessage(req, res, next) {
    const message = await messageService.createMessage(req.body);

    if (message !== null) {
        res.status(StatusCodes.CREATED).json({
            status: "Success",
            message: message,
        });
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: "Message not created",
        });
    }
    next();
}

export async function getMessages(req, res) {
    const messages = await messageService.getMessages();

    if (messages !== null) {
        res.status(StatusCodes.OK).json({
            status: "Success",
            message: messages,
        });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            status: "Error",
            message: "Messages not found",
        });
    }
}
