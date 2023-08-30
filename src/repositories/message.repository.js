import { StatusCodes } from "http-status-codes";
import pool from "../database/pool.js";
import dotenv from "dotenv";
import createError from "../utils/createError.js";

dotenv.config();

export async function getMessageById(id) {
    const { rows } = await pool.query(
        `SELECT * FROM "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_TABLE} WHERE id = $1`,
        [id],
    );

    if (rows.length > 0) {
        return rows[0];
    } else {
        throw createError(StatusCodes.NOT_FOUND, "Message not found");
    }
}

export async function createMessage(body) {
    const { rows } = await pool.query(
        `INSERT INTO "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_TABLE} (created_by, message) VALUES ($1, $2) RETURNING *`,
        [body.created_by, body.message],
    );
    return rows[0];
}

export async function getMessages() {
    const { rows } = await pool.query(
        `SELECT * FROM "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_TABLE} ORDER BY id ASC`,
    );

    if (rows.length > 0) {
        return rows;
    } else {
        throw createError(StatusCodes.NOT_FOUND, "Messages not found");
    }
}
