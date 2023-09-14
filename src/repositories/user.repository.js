const pool = require("../database/pool.js");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createLog = require("../utils/createLog.js");

dotenv.config();

async function createUser(username, password) {
    createLog("info", "[REPOSITORY] Creating user", null, {
        username: username,
        password: password,
    });

    const { rows } = await pool.query(
        `INSERT INTO
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            (username, password)
            VALUES ($1, $2)
            RETURNING id, username
        `,
        [username, password],
    );

    createLog("info", "[REPOSITORY] User created", null, rows[0]);

    return rows[0];
}

async function createSessionToken(username, password) {
    createLog("info", "[REPOSITORY] Creating session token", null, {
        username: username,
        password: password,
    });

    const { rows } = await pool.query(
        `SELECT * FROM
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            WHERE username = $1
        `,
        [username],
    );

    if (!rows[0]) {
        createLog("info", "[REPOSITORY] User does not exist", null, {
            username: username,
        });

        return { message: "User does not exist" };
    } else {
        createLog("info", "[REPOSITORY] User exists. Checking password", null, {
            username: username,
        });

        const isPasswordValid = bcrypt.compareSync(password, rows[0].password);

        if (!isPasswordValid) {
            createLog("info", "[REPOSITORY] Password is incorrect", null, {
                username: username,
            });

            return { message: "Password is incorrect" };
        } else {
            createLog("info", "[REPOSITORY] Password is correct", null, {
                username: username,
            });

            createLog("info", "[REPOSITORY] Creating JWT", null, {
                username: username,
            });

            const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);

            createLog("info", "[REPOSITORY] JWT created", null, {
                username: username,
            });

            createLog("info", "[REPOSITORY] Storing token", null, {
                username: username,
            });

            await pool.query(
                `INSERT INTO
                    "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_TOKENS_TABLE}
                    (token, user_id)
                    VALUES ($1, $2)
                `,
                [token, rows[0].id],
            );

            createLog("info", "[REPOSITORY] Token stored", null, {
                username: username,
            });

            return { token: token };
        }
    }
}

async function getUserByUsername(username) {
    createLog("info", "[REPOSITORY] Getting user by username", null, {
        username: username,
    });

    const { rows } = await pool.query(
        `SELECT * FROM
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            WHERE username = $1
        `,
        [username],
    );

    createLog("info", "[REPOSITORY] User retrieved", null, rows[0]);

    return rows[0];
}

async function getUserById(id) {
    createLog("info", "[REPOSITORY] Getting user by id", null, { id: id });

    const { rows } = await pool.query(
        `SELECT * FROM
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            WHERE id = $1
        `,
        [id],
    );

    createLog("info", "[REPOSITORY] User retrieved", null, rows[0]);

    return rows[0];
}

module.exports = {
    createUser,
    createSessionToken,
    getUserByUsername,
    getUserById,
};
