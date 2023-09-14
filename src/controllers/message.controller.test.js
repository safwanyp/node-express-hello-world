// GET /messages: should return all messages ({
//     "status": "success",
//     "message": [{ "id": 1, "created_by": "safwan", "message": "hello" }, ...]
// })
// GET /messages/:id: should return a message by id ({
//     "status": "success",
//     "message": { "id": 1, "created_by": "safwan", "message": "hello" }
// })
// POST /messages: should create a message ({
//     "status": "success",
//     "message": { "id": 1, "created_by": "safwan", "message": "hello" }
// })

const { StatusCodes } = require("http-status-codes");
const messageController = require("./message.controller.js");
const messageService = require("../services/message.service.js");

jest.mock("../services/message.service.js");

describe("message.controller", () => {
    describe("Happy cases", () => {
        describe("getMessageById", () => {
            it("should return a message by id", async () => {
                const mockRequest = {
                    params: {
                        id: 1,
                    },
                };

                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };

                const mockNext = jest.fn();

                messageService.getMessageById.mockResolvedValue({
                    id: 1,
                    created_by: "safwan",
                    message: "hello",
                });

                await messageController.getMessageById(
                    mockRequest,
                    mockResponse,
                    mockNext,
                );

                expect(messageService.getMessageById).toHaveBeenCalledWith(1);
                expect(mockNext).toHaveBeenCalledWith({
                    code: StatusCodes.OK,
                    status: "Success",
                    message: {
                        id: 1,
                        created_by: "safwan",
                        message: "hello",
                    },
                });
            });
        });

        describe("createMessage", () => {
            it("should create a message", async () => {
                const mockRequest = {
                    body: {
                        created_by: "safwan",
                        message: "hello",
                    },
                };

                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };

                const mockNext = jest.fn();

                messageService.createMessage.mockResolvedValue({
                    id: 1,
                    created_by: "safwan",
                    message: "hello",
                });

                await messageController.createMessage(
                    mockRequest,
                    mockResponse,
                    mockNext,
                );

                expect(messageService.createMessage).toHaveBeenCalledWith({
                    created_by: "safwan",
                    message: "hello",
                });
                expect(mockNext).toHaveBeenCalledWith({
                    code: StatusCodes.CREATED,
                    status: "Success",
                    message: {
                        id: 1,
                        created_by: "safwan",
                        message: "hello",
                    },
                });
            });
        });

        describe("getMessages", () => {
            it("should return all messages", async () => {
                const mockRequest = {};

                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };

                const mockNext = jest.fn();

                messageService.getMessages.mockResolvedValue([
                    {
                        id: 1,
                        created_by: "safwan",
                        message: "hello",
                    },
                    {
                        id: 2,
                        created_by: "safwan",
                        message: "hello",
                    },
                ]);

                await messageController.getMessages(
                    mockRequest,
                    mockResponse,
                    mockNext,
                );

                expect(messageService.getMessages).toHaveBeenCalled();
                expect(mockNext).toHaveBeenCalledWith({
                    code: StatusCodes.OK,
                    status: "Success",
                    message: [
                        {
                            id: 1,
                            created_by: "safwan",
                            message: "hello",
                        },
                        {
                            id: 2,
                            created_by: "safwan",
                            message: "hello",
                        },
                    ],
                });
            });
        });
    });
    describe("Error cases", () => {
        describe("getMessageById", () => {
            it("should handle error when fetching a message by id", async () => {
                const mockRequest = {
                    params: {
                        id: 1,
                    },
                    body: {
                        created_by: "safwan",
                        message: "hello",
                    },
                };

                const mockResponse = {};
                const mockNext = jest.fn();

                // Mock the service to throw an error
                messageService.getMessageById.mockRejectedValue({
                    code: 400,
                    status: "Error",
                    message: "Request body should be empty",
                });

                await messageController.getMessageById(
                    mockRequest,
                    mockResponse,
                    mockNext,
                );

                expect(mockNext).toHaveBeenCalledWith({
                    code: StatusCodes.INTERNAL_SERVER_ERROR,
                });
            });
        });

        describe("getMessages", () => {
            it("should handle error when fetching all messages", async () => {
                const mockRequest = {
                    params: {
                        id: 1,
                    },
                    body: {
                        created_by: "safwan",
                        message: "hello",
                    },
                };

                const mockResponse = {};
                const mockNext = jest.fn();

                // Mock the service to throw an error
                messageService.getMessages.mockRejectedValue({
                    code: 400,
                    status: "Error",
                    message: "Request body should be empty",
                });

                await messageController.getMessages(
                    mockRequest,
                    mockResponse,
                    mockNext,
                );

                expect(mockNext).toHaveBeenCalledWith({
                    code: StatusCodes.INTERNAL_SERVER_ERROR,
                });
            });
        });
    });
});
