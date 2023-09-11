import pool from "../database/pool.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

dotenv.config();

export async function createUser(username, password) {
    const { rows } = await pool.query(
        `INSERT INTO
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            (username, password)
            VALUES ($1, $2)
            RETURNING id, username
        `,
        [username, password],
    );

    return rows[0];
}

export async function createSessionToken(username, password) {
    const { rows } = await pool.query(
        `SELECT * FROM
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            WHERE username = $1
        `,
        [username],
    );

    if (!rows[0]) {
        return { message: "User does not exist" };
    } else {
        const isPasswordValid = bcrypt.compareSync(password, rows[0].password);

        if (!isPasswordValid) {
            return { message: "Password is incorrect" };
        } else {
            const token = jwt.encode(password, process.env.JWT_SECRET);

            await pool.query(
                `INSERT INTO
                    "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_TOKENS_TABLE}
                    (token, user_id)
                    VALUES ($1, $2)
                `,
                [token, rows[0].id],
            );

            return { token: token };
        }
    }
}
