const express = require("express");
const { login, register } = require("../controllers/user.controller.js");
const validateLoginRequest = require("../middlewares/login/validateRequest.middleware.js");
const validateLoginResponse = require("../middlewares/login/validateResponse.middleware.js");

const userRouter = express.Router();

userRouter.post("/login", validateLoginRequest, login, validateLoginResponse);
userRouter.post("/register", register);

module.exports = userRouter;
