const express = require("express");
const { StatusCodes } = require("http-status-codes");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Welcome to the Hello World API!",
    });
});

module.exports = indexRouter;
