const config = {
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/*.test.js"],
};

module.exports = config;
