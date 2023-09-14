const express = require("express");
const { login, register } = require("../controllers/user.controller.js");
const validateLoginRequest = require("../middlewares/login/validateRequest.middleware.js");
const validateLoginResponse = require("../middlewares/login/validateResponse.middleware.js");
const validateRegisterRequest = require("../middlewares/register/validateRequest.middleware.js");
const validateRegisterResponse = require("../middlewares/register/validateResponse.middleware.js");

const userRouter = express.Router();

userRouter.post("/login", validateLoginRequest, login, validateLoginResponse);
userRouter.post(
    "/register",
    validateRegisterRequest,
    register,
    validateRegisterResponse,
);

module.exports = userRouter;
