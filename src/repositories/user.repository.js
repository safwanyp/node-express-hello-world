const pool = require("../database/pool.js");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createLog = require("../utils/createLog.js");

dotenv.config();

async function createUser(req, username, password) {
    createLog("info", "[REPOSITORY] Creating user", req, {
        username: username,
        password: password,
    });

    // check if username already exists
    const user = await getUserByUsername(req, username);

    if (user) {
        createLog("info", "[REPOSITORY] User already exists", req, {
            username: username,
        });

        return { message: "User already exists" };
    } else {
        createLog("info", "[REPOSITORY] User does not exist", req, {
            username: username,
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
        createLog("info", "[REPOSITORY] User created", req, rows[0]);

        return rows[0];
    }
}

async function createSessionToken(req, username, password) {
    createLog("info", "[REPOSITORY] Creating session token", req, {
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
        createLog("info", "[REPOSITORY] User does not exist", req, {
            username: username,
        });

        return { message: "User does not exist" };
    } else {
        createLog("info", "[REPOSITORY] User exists. Checking password", req, {
            username: username,
        });

        const isPasswordValid = bcrypt.compareSync(password, rows[0].password);

        if (!isPasswordValid) {
            createLog("info", "[REPOSITORY] Password is incorrect", req, {
                username: username,
            });

            return { message: "Password is incorrect" };
        } else {
            createLog("info", "[REPOSITORY] Password is correct", req, {
                username: username,
            });

            createLog("info", "[REPOSITORY] Creating JWT", req, {
                username: username,
            });

            const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);

            createLog("info", "[REPOSITORY] JWT created", req, {
                username: username,
            });

            createLog("info", "[REPOSITORY] Storing token", req, {
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

            createLog("info", "[REPOSITORY] Token stored", req, {
                username: username,
            });

            return { token: token };
        }
    }
}

async function getUserByUsername(req, username) {
    createLog("info", "[REPOSITORY] Getting user by username", req, {
        username: username,
    });

    const { rows } = await pool.query(
        `SELECT * FROM
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            WHERE username = $1
        `,
        [username],
    );

    createLog("info", "[REPOSITORY] User retrieved", req, rows[0]);

    return rows[0];
}

async function getUserById(req, id) {
    createLog("info", "[REPOSITORY] Getting user by id", req, { id: id });

    const { rows } = await pool.query(
        `SELECT * FROM
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_USERS_TABLE}
            WHERE id = $1
        `,
        [id],
    );

    createLog("info", "[REPOSITORY] User retrieved", req, rows[0]);

    return rows[0];
}

module.exports = {
    createUser,
    createSessionToken,
    getUserByUsername,
    getUserById,
};
