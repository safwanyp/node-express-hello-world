const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository.js");
const createLog = require("../utils/createLog.js");

async function createUser(req, username, password) {
    createLog("info", "[SERVICE] Hashing password", req, {
        username: username,
    });

    const hashedPassword = bcrypt.hashSync(password, 12);

    createLog("info", "[SERVICE] Hashed password", req, {
        username: username,
    });

    createLog("info", "[SERVICE] Creating user", req, {
        username: username,
    });

    const user = await userRepository.createUser(req, username, hashedPassword);

    if (user.message) {
        createLog("info", "[SERVICE] User already exists", req, {
            username: username,
        });

        return { message: "User already exists" };
    } else {
        createLog("info", "[SERVICE] User created", req, user);

        return user;
    }
}

async function createSessionToken(req, username, password) {
    createLog("info", "[SERVICE] Creating session token", req, {
        username: username,
    });

    const token = await userRepository.createSessionToken(
        req,
        username,
        password,
    );

    createLog("info", "[SERVICE] Created session token", req, {
        username: username,
    });

    return token;
}

module.exports = {
    createUser,
    createSessionToken,
};
