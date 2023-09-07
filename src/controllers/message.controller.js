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

export async function getMessages(req, res, next) {
    try {
        const messages = await messageService.getMessages();

        if (messages) {
            const response = {
                code: StatusCodes.OK,
                status: "Success",
                message: messages,
            };

            next(response);
        } else {
            next({
                code: StatusCodes.NOT_FOUND,
                status: "Error",
                message: "No messages found.",
            });
        }
    } catch (err) {
        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

export async function createMessage(req, res, next) {
    const message = await messageService.createMessage(req.body);

    if (message !== null) {
        const response = {
            code: StatusCodes.CREATED,
            status: "Success",
            message: message,
        };

        next(response);
    } else {
        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
    next();
}
