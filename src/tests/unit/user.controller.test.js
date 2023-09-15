const userController = require("../../controllers/user.controller.js");
const userService = require("../../services/user.service.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

jest.mock("passport");
jest.mock("jsonwebtoken");
jest.mock("../../services/user.service.js");

describe("login.controller", () => {
    describe("Happy cases", () => {
        describe("login", () => {
            it("should log in a user", async () => {
                const mockRequest = {
                    body: {
                        username: "safwan",
                        password: "password",
                    },
                };

                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    code: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };

                const mockNext = jest.fn();

                passport.authenticate = jest.fn(
                    (strategy, options, callback) => {
                        callback(null, { id: 1, username: "safwan" }, null);
                        return (req, res, next) => {
                            next();
                        };
                    },
                );

                jwt.sign = jest.fn(() => "mocked_jwt_token");

                await userController.login(mockRequest, mockResponse, mockNext);

                expect(mockNext).toHaveBeenCalledWith({
                    status: "Success",
                    code: 200,
                    message: {
                        username: "safwan",
                        token: "mocked_jwt_token",
                    },
                });
            });
        });
    });

    describe("Error cases", () => {
        describe("login", () => {
            it("should handle user not found", async () => {
                const mockRequest = {
                    body: {
                        username: "nonexistent",
                        password: "password",
                    },
                };

                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };

                const mockNext = jest.fn();

                passport.authenticate = jest.fn(
                    (strategy, options, callback) => {
                        callback(null, null, { message: "User not found" });
                        return (req, res, next) => {
                            next();
                        };
                    },
                );

                await userController.login(mockRequest, mockResponse, mockNext);

                expect(mockNext).toHaveBeenCalledWith({
                    code: 404,
                    message: "User not found",
                });
            });

            it("should handle authentication error", async () => {
                const mockRequest = {
                    body: {
                        username: "safwan",
                        password: "wrongpassword",
                    },
                };

                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };

                const mockNext = jest.fn();

                passport.authenticate = jest.fn(
                    (strategy, options, callback) => {
                        callback(new Error("Authentication error"), null, null);
                        return (req, res, next) => {
                            next();
                        };
                    },
                );

                await userController.login(mockRequest, mockResponse, mockNext);

                expect(mockNext).toHaveBeenCalledWith(
                    new Error("Authentication error"),
                );
            });
        });
    });
});

describe("register.controller", () => {
    describe("Happy cases", () => {
        it("should register a user successfully", async () => {
            const mockRequest = {
                body: {
                    username: "safwan",
                    password: "securepassword",
                },
            };

            const mockResponse = {};
            const mockNext = jest.fn();

            userService.createUser.mockResolvedValue({
                id: 1,
                username: "safwan",
            });

            await userController.register(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith({
                status: "Success",
                code: 201,
                message: {
                    username: "safwan",
                    id: 1,
                },
            });
        });
    });

    describe("Error cases", () => {
        it("should handle user already exists error", async () => {
            const mockRequest = {
                body: {
                    username: "safwan",
                    password: "securepassword",
                },
            };

            const mockResponse = {};
            const mockNext = jest.fn();

            userService.createUser.mockResolvedValue({
                message: "User already exists",
            });

            await userController.register(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith({
                code: StatusCodes.CONFLICT,
                message: "User already exists",
            });
        });

        it("should handle other errors", async () => {
            const mockRequest = {
                body: {
                    username: "safwan",
                    password: "securepassword",
                },
            };

            const mockResponse = {};
            const mockNext = jest.fn();

            const mockError = new Error("Database error");
            userService.createUser.mockRejectedValue(mockError);

            await userController.register(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: mockError.message,
            });
        });
    });
});
