const { StatusCodes } = require("http-status-codes");
const messageService = require("../services/message.service.js");
const createLog = require("../utils/createLog.js");

async function getMessageById(req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
        message_id: req.params.id,
    };

    try {
        createLog("info", "[CONTROLLER] Fetching message", req, meta);

        const message = await messageService.getMessageById(req, req.params.id);

        if (message) {
            const response = {
                code: StatusCodes.OK,
                status: "Success",
                message: message,
            };

            createLog("info", "[CONTROLLER] Message fetched", req, meta);
            next(response);
        } else {
            createLog("error", "[CONTROLLER] Message not found", req, meta);

            next({
                code: StatusCodes.NOT_FOUND,
                status: "Error",
                message: "Message not found",
            });
        }
    } catch (err) {
        createLog("error", "[CONTROLLER] Failed to fetch message", req, meta);
        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

async function getMessages(req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
    };

    try {
        createLog("info", "[CONTROLLER] Fetching messages", req, meta);

        const messages = await messageService.getMessages(req);

        if (messages) {
            const response = {
                code: StatusCodes.OK,
                status: "Success",
                message: messages,
            };

            createLog("info", "[CONTROLLER] Messages fetched", req, meta);
            next(response);
        } else {
            createLog("error", "[CONTROLLER] No messages found", req, meta);
            next({
                code: StatusCodes.NOT_FOUND,
                status: "Error",
                message: "No messages found.",
            });
        }
    } catch (err) {
        createLog("error", "[CONTROLLER] Failed to fetch messages", req, meta);
        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

async function createMessage(req, res, next) {
    const meta = {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
    };

    try {
        createLog("info", "[CONTROLLER] Creating message", req, meta);
        const message = await messageService.createMessage(req, req.body);

        if (message !== null) {
            const response = {
                code: StatusCodes.CREATED,
                status: "Success",
                message: message,
            };

            createLog("info", "[CONTROLLER] Message created", req, meta);
            next(response);
        } else {
            createLog(
                "error",
                "[CONTROLLER] Failed to create message",
                req,
                meta,
            );
            next({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
            });
        }
        next();
    } catch (err) {
        createLog("error", "[CONTROLLER] Failed to create message", req, meta);
        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

module.exports = {
    getMessageById,
    getMessages,
    createMessage,
};
