import * as messageRepository from "../repositories/message.repository.js";

export async function getMessageById(id) {
    return await messageRepository.getMessageById(id);
}

export async function createMessage(body) {
    return await messageRepository.createMessage(body);
}

export async function getMessages() {
    return await messageRepository.getMessages();
}
