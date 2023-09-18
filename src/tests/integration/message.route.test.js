const request = require("supertest");
const { app, server } = require("../../app");
const dotenv = require("dotenv");

dotenv.config();

afterAll((done) => {
    server.close(done);
});

const token = process.env.TEST_TOKEN;

// TODO: Add error handling tests

describe("Message Route", () => {
    describe("GET /messages", () => {
        it("should return a list of messages", async () => {
            const response = await request(app)
                .get("/messages")
                .set({
                    Authorization: "Bearer " + token,
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body).toHaveProperty("code");
            expect(response.body).toHaveProperty("status");

            expect(response.body.message).toBeInstanceOf(Array);
        });
    });

    describe("GET /messages/:id", () => {
        it("should return a single message", async () => {
            const response = await request(app)
                .get("/messages/1")
                .set({
                    Authorization: "Bearer " + token,
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body).toHaveProperty("code");
            expect(response.body).toHaveProperty("status");

            expect(response.body.message).toBeInstanceOf(Object);
            expect(response.body.message).toHaveProperty("id");
            expect(response.body.message).toHaveProperty("created_by");
            expect(response.body.message).toHaveProperty("message");

            expect(response.body.code).toBe(200);
            expect(response.body.status).toBe("Success");
        });
    });

    describe("POST /messages", () => {
        it("should create a new message", async () => {
            const response = await request(app)
                .post("/messages")
                .set({
                    Authorization: "Bearer " + token,
                })
                .send({
                    created_by: "Safwan Testing",
                    message: "This is a test message",
                });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(response.body).toHaveProperty("code");
            expect(response.body).toHaveProperty("status");

            expect(response.body.message).toBeInstanceOf(Object);
            expect(response.body.message).toHaveProperty("id");
            expect(response.body.message).toHaveProperty("created_by");
            expect(response.body.message).toHaveProperty("message");
            expect(response.body.message.created_by).toBe("Safwan Testing");
            expect(response.body.message.message).toBe(
                "This is a test message",
            );

            expect(response.body.code).toBe(201);
            expect(response.body.status).toBe("Success");
        });
    });
});
