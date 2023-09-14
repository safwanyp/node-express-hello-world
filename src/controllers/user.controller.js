const passport = require("passport");
const userService = require("../services/user.service.js");
const jwt = require("jsonwebtoken");
const createLog = require("../utils/createLog.js");

async function login(req, res, next) {
    createLog("info", "[CONTROLLER] Attempting to log in", req, {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
    });

    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) {
            createLog("error", "[CONTROLLER] Error logging in", req, {
                path: req.originalUrl,
                method: req.method,
                body: err,
            });
            return next(err);
        }
        if (!user) {
            createLog("info", "[CONTROLLER] User does not exist", req, {
                path: req.originalUrl,
                method: req.method,
                body: info.message,
            });

            return next({ code: 404, message: info.message });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        createLog("info", "[CONTROLLER] User logged in", req, {
            path: req.originalUrl,
            method: req.method,
            body: {
                username: user.username,
                token: token,
            },
        });

        next({
            status: "Success",
            code: 200,
            message: {
                username: user.username,
                token: token,
            },
        });
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
