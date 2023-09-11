import * as userService from "../services/user.service.js";

export async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const token = await userService.createSessionToken(username, password);

    return res.json(token);
}

export async function register(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userService.createUser(email, password);

    return res.json(user);
}
