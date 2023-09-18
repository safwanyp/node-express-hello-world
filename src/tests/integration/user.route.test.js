const request = require("supertest");
const { app, server } = require("../../app");
const dotenv = require("dotenv");

dotenv.config();

afterAll((done) => {
    server.close(done);
});

describe("User Route", () => {
    describe("POST /users/login", () => {
        it("should log in a user", async () => {
            const response = await request(app).post("/users/login").send({
                username: "safwanyp",
                password: "aabbccdd",
            });

            expect(response.statusCode).toBe(200);

            expect(response.body).toHaveProperty("status");
            expect(response.body.status).toBe("Success");

            expect(response.body).toHaveProperty("code");
            expect(response.body.code).toBe(200);

            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toHaveProperty("username");
            expect(response.body.message.username).toBe("safwanyp");
            expect(response.body.message).toHaveProperty("token");
        });
    });

    describe("POST /users/register", () => {
        it("should register a new user", async () => {
            const username = `testUsername_${Math.random(1, 1000)}`;

            const response = await request(app).post("/users/register").send({
                username: username,
                password: "testPassword",
            });

            expect(response.statusCode).toBe(201);

            expect(response.body).toHaveProperty("status");
            expect(response.body.status).toBe("Success");

            expect(response.body).toHaveProperty("code");
            expect(response.body.code).toBe(201);

            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toHaveProperty("username");
            expect(response.body.message.username).toBe(username);
            expect(response.body.message).toHaveProperty("id");
        });
    });
});
