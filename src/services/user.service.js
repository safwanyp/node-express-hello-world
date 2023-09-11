import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user.repository.js";

export async function createUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 12);

    return await userRepository.createUser(username, hashedPassword);
}

export async function createSessionToken(username, password) {
    return await userRepository.createSessionToken(username, password);
}
