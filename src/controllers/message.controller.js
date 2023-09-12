const { StatusCodes } = require("http-status-codes");
const messageService = require("../services/message.service.js");
const logger = require("../utils/logger.js");

async function getMessageById(req, res, next) {
    try {
        logger.info(`[CONTROLLER] Fetching message by id`, {
            id: req.params.id,
        });

        const message = await messageService.getMessageById(req.params.id);

        if (message) {
            const response = {
                code: StatusCodes.OK,
                status: "Success",
                message: message,
            };

            logger.info(`[CONTROLLER] Message fetched`, {
                body: response,
            });

            next(response);
        } else {
            logger.error(`[CONTROLLER] Message not found`, {
                id: req.params.id,
            });

            next({
                code: StatusCodes.NOT_FOUND,
                status: "Error",
                message: "Message not found",
            });
        }
    } catch (err) {
        logger.error(`[CONTROLLER] Failed to fetch message`, {
            error: err,
        });

        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

async function getMessages(req, res, next) {
    try {
        logger.info(`[CONTROLLER] Fetching all messages`);

        const messages = await messageService.getMessages();

        if (messages) {
            const response = {
                code: StatusCodes.OK,
                status: "Success",
                message: messages,
            };

            logger.info(`[CONTROLLER] Messages fetched`, {
                body: response,
            });

            next(response);
        } else {
            logger.error(`[CONTROLLER] No messages found`);

            next({
                code: StatusCodes.NOT_FOUND,
                status: "Error",
                message: "No messages found.",
            });
        }
    } catch (err) {
        logger.error(`[CONTROLLER] Failed to fetch messages`, {
            error: err,
        });

        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

async function createMessage(req, res, next) {
    logger.info(`[CONTROLLER] Creating message`, {
        body: req.body,
    });

    const message = await messageService.createMessage(req.body);

    if (message !== null) {
        const response = {
            code: StatusCodes.CREATED,
            status: "Success",
            message: message,
        };

        logger.info(`[CONTROLLER] Message created`, {
            body: response,
        });

        next(response);
    } else {
        logger.error(`[CONTROLLER] Failed to create message`, {
            body: req.body,
        });

        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
    next();
}

module.exports = {
    getMessageById,
    getMessages,
    createMessage,
};
