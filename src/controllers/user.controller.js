const passport = require("passport");
const userService = require("../services/user.service.js");
const jwt = require("jsonwebtoken");
const createLog = require("../utils/createLog.js");
const { StatusCodes } = require("http-status-codes");

async function login(req, res, next) {
    try {
        createLog("info", "[CONTROLLER] Attempting to log in", req, {
            path: req.originalUrl,
            method: req.method,
            body: req.body,
        });

        await passport.authenticate(
            "local",
            { session: false },
            (err, user, info) => {
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

                    return next({
                        code: StatusCodes.NOT_FOUND,
                        message: info.message,
                    });
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
                    code: StatusCodes.OK,
                    message: {
                        username: user.username,
                        token: token,
                    },
                });
            },
        )(req, res, next);
    } catch (err) {
        createLog("error", "[CONTROLLER] Error logging in", req, {
            path: req.originalUrl,
            method: req.method,
            body: err,
        });
        next(err);
    }
}

async function register(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        createLog("info", "[CONTROLLER] Attempting to register", req, {
            path: req.originalUrl,
            method: req.method,
            body: req.body,
        });

        const user = await userService.createUser(req, username, password);

        if (user.message) {
            createLog("info", "[CONTROLLER] User already exists", req, {
                path: req.originalUrl,
                method: req.method,
                body: user,
            });

            return next({ code: StatusCodes.CONFLICT, message: user.message });
        }

        createLog("info", "[CONTROLLER] User registered", req, {
            path: req.originalUrl,
            method: req.method,
            body: user,
        });

        return next({
            status: "Success",
            code: StatusCodes.CREATED,
            message: {
                username: user.username,
                id: user.id,
            },
        });
    } catch (err) {
        createLog("error", "[CONTROLLER] Error registering user", req, {
            path: req.originalUrl,
            method: req.method,
            body: err,
            errorStack: err.stack,
        });

        next({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
}

module.exports = {
    login,
    register,
};
