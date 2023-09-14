const userService = require("../services/user.service.js");

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const token = await userService.createSessionToken(username, password);

    return res.json(token);
}

async function register(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userService.createUser(username, password);

    return res.json(user);
}

module.exports = {
    login,
    register,
};
