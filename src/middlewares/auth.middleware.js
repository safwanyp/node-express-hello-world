// const jwt = require("jsonwebtoken");
const passport = require("passport");
const createLog = require("../utils/createLog");
const { StatusCodes } = require("http-status-codes");

async function authMiddleware(req, res, next) {
    createLog("info", "[AUTH] Authorizing user", req, {
        path: req.originalUrl,
        method: req.method,
        body: req.body,
    });

    await passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
            createLog("error", "[AUTH] Error authorizing user", req, {
                path: req.originalUrl,
                method: req.method,
                body: req.body,
            });

            return next(err);
        }
        if (!user) {
            createLog("error", "[AUTH] User not authorized", req, {
                path: req.originalUrl,
                method: req.method,
                body: req.body,
            });

            return res.status(StatusCodes.UNAUTHORIZED).json({
                code: StatusCodes.UNAUTHORIZED,
                status: "Unauthorized",
                message: "User not authorized",
            });
        }

        createLog("info", "[AUTH] User authorized", req, {
            path: req.originalUrl,
            method: req.method,
            body: req.body,
        });

        req.user = user;
        next();
    })(req, res, next);
}

module.exports = authMiddleware;
