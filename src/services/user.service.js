const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository.js");

async function createUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 12);

    return await userRepository.createUser(username, hashedPassword);
}

async function createSessionToken(username, password) {
    return await userRepository.createSessionToken(username, password);
}

module.exports = {
    createUser,
    createSessionToken,
};
