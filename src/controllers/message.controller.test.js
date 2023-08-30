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

import { StatusCodes } from "http-status-codes";
import * as messageController from "./message.controller.js";
import * as messageService from "../services/message.service.js";

jest.mock("../services/message.service.js");

describe("message.controller", () => {
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
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
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
            expect(mockResponse.status).toHaveBeenCalledWith(
                StatusCodes.CREATED,
            );
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: "Success",
                message: {
                    id: 1,
                    created_by: "safwan",
                    message: "hello",
                },
            });
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("getMessages", () => {
        it("should return all messages", async () => {
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

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

            await messageController.getMessages(mockRequest, mockResponse);

            expect(messageService.getMessages).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
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
