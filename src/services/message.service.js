const messageRepository = require("../repositories/message.repository.js");

async function getMessageById(id) {
    return await messageRepository.getMessageById(id);
}

async function createMessage(body) {
    return await messageRepository.createMessage(body);
}

async function getMessages() {
    return await messageRepository.getMessages();
}

module.exports = {
    getMessageById,
    createMessage,
    getMessages,
};
