const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository.js");
const createLog = require("../utils/createLog.js");

async function createUser(username, password) {
    createLog("info", "[SERVICE] Hashing password", null, {
        username: username,
    });

    const hashedPassword = bcrypt.hashSync(password, 12);

    createLog("info", "[SERVICE] Hashed password", null, {
        username: username,
    });

    createLog("info", "[SERVICE] Creating user", null, {
        username: username,
    });

    const user = await userRepository.createUser(username, hashedPassword);

    if (user.message) {
        createLog("info", "[SERVICE] User already exists", null, {
            username: username,
        });

        return { message: "User already exists" };
    } else {
        createLog("info", "[SERVICE] User created", null, user);

        return user;
    }
}

async function createSessionToken(username, password) {
    createLog("info", "[SERVICE] Creating session token", null, {
        username: username,
    });

    const token = await userRepository.createSessionToken(username, password);

    createLog("info", "[SERVICE] Created session token", null, {
        username: username,
    });

    return token;
}

module.exports = {
    createUser,
    createSessionToken,
};
