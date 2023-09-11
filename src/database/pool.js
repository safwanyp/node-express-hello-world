import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export async function createUsersTable() {
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

export async function createTokensTable() {
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

export async function createMessageTable() {
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

export async function createSchema() {
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

await createSchema();
await createMessageTable();
await createUsersTable();
await createTokensTable();

export default pool;
