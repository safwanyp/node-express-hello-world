import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

async function createMessageTable() {
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
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

async function createSchema() {
    const schema = `
        CREATE SCHEMA IF NOT EXISTS
            ${process.env.POSTGRES_SCHEMA}
    `;

    pool.query(schema)
        .then((res) => {
            console.log(res);
            pool.end();
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

pool.on("connect", () => {
    console.log(`Connected to the database`);
    createSchema().then(() => {
        createMessageTable();
    });
});

pool.on("remove", () => {
    console.log("Client removed");
    process.exit(0);
});

export default pool;
