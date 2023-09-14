const passport = require("passport");
const userService = require("../services/user.service.js");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.json({ token });
    })(req, res, next);
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
