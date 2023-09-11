import pool from "../database/pool.js";
import dotenv from "dotenv";

dotenv.config();

export async function getMessageById(id) {
    const { rows } = await pool.query(
        `SELECT * FROM 
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_MESSAGES_TABLE} 
            WHERE id = $1
        `,
        [id],
    );

    return rows[0];
}

export async function createMessage(body) {
    const { rows } = await pool.query(
        `INSERT INTO 
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_MESSAGES_TABLE} 
            (created_by, message) VALUES ($1, $2) 
            RETURNING *
        `,
        [body.created_by, body.message],
    );

    return rows[0];
}

export async function getMessages() {
    const { rows } = await pool.query(
        `SELECT * FROM 
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_MESSAGES_TABLE} 
            ORDER BY id ASC
        `,
    );

    return rows;
}
