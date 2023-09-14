const messageRepository = require("../repositories/message.repository.js");
const createLog = require("../utils/createLog.js");

async function getMessageById(req, id) {
    createLog("info", "[SERVICE] Fetching message", req, {
        message_id: id,
    });

    const message = await messageRepository.getMessageById(req, id);

    createLog("info", "[SERVICE] Message fetched", req, {
        message_id: id,
    });

    return message;
}

async function createMessage(req, body) {
    createLog("info", "[SERVICE] Creating message", req, {
        body: body,
    });
    const message = await messageRepository.createMessage(req, body);

    createLog("info", "[SERVICE] Message created", req, {
        message_id: message.id,
    });

    return message;
}

async function getMessages(req) {
    createLog("info", "[SERVICE] Fetching messages", req, {});
    const message = await messageRepository.getMessages(req);

    createLog("info", "[SERVICE] Messages fetched", req, {});

    return message;
}

module.exports = {
    getMessageById,
    createMessage,
    getMessages,
};
