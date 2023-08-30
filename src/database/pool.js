import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export async function createMessageTable() {
    const messageTable = `
        CREATE TABLE IF NOT EXISTS
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_TABLE}(
                id SERIAL PRIMARY KEY,
                created_by VARCHAR(128) NOT NULL,
                message VARCHAR(128) NOT NULL
            )
    `;

    pool.query(messageTable)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

export async function createSchema() {
    const schema = `
        CREATE SCHEMA IF NOT EXISTS
            "${process.env.POSTGRES_SCHEMA}"
    `;

    pool.query(schema)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
});

export default pool;
