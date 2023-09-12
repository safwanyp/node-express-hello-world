const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

async function createUsersTable() {
    const usersTable = `
        CREATE TABLE IF NOT EXISTS
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}(
                id SERIAL PRIMARY KEY,
                username VARCHAR(128) NOT NULL,
                password VARCHAR(128) NOT NULL
            )
    `;

    try {
        await pool.query(usersTable);
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

async function createTokensTable() {
    const tokensTable = `
        CREATE TABLE IF NOT EXISTS
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_TOKENS_TABLE}(
                id SERIAL PRIMARY KEY,
                token VARCHAR(512) NOT NULL,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}(id)
            )
    `;

    try {
        await pool.query(tokensTable);
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

async function createMessageTable() {
    const messageTable = `
        CREATE TABLE IF NOT EXISTS
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_MESSAGES_TABLE}(
                id SERIAL PRIMARY KEY,
                created_by VARCHAR(128) NOT NULL,
                message VARCHAR(128) NOT NULL
            )
    `;

    try {
        await pool.query(messageTable);
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

async function createSchema() {
    const schema = `
        CREATE SCHEMA IF NOT EXISTS
            "${process.env.POSTGRES_SCHEMA}"
    `;

    try {
        await pool.query(schema);
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
});

createSchema().then(() => {
    createUsersTable().then(() => {
        createTokensTable().then(() => {
            createMessageTable().then(() => {
                console.log("Database ready");
            });
        });
    });
});

module.exports = pool;
