const { StatusCodes } = require("http-status-codes");

const statusCodes = [
    StatusCodes.OK,
    StatusCodes.CREATED,
    StatusCodes.CONFLICT,
    StatusCodes.NOT_FOUND,
    StatusCodes.BAD_REQUEST,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.INTERNAL_SERVER_ERROR,
];

module.exports = statusCodes;
