const pool = require("../database/pool.js");
const dotenv = require("dotenv");
const createLog = require("../utils/createLog.js");

dotenv.config();

async function getMessageById(req, id) {
    createLog("info", "[REPOSITORY] Fetching message", req, {
        message_id: id,
    });

    const { rows } = await pool.query(
        `SELECT * FROM 
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_MESSAGES_TABLE} 
            WHERE id = $1
        `,
        [id],
    );

    createLog("info", "[REPOSITORY] Message fetched", req, {
        message_id: id,
        message: rows[0],
    });

    return rows[0];
}

async function createMessage(req, body) {
    createLog("info", "[REPOSITORY] Creating message", req, {
        body: body,
    });

    const { rows } = await pool.query(
        `INSERT INTO 
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_MESSAGES_TABLE} 
            (created_by, message) VALUES ($1, $2) 
            RETURNING *
        `,
        [body.created_by, body.message],
    );

    createLog("info", "[REPOSITORY] Message created", req, {
        message_id: rows[0].id,
    });

    return rows[0];
}

async function getMessages(req) {
    createLog("info", "[REPOSITORY] Fetching messages", req, null);

    const { rows } = await pool.query(
        `SELECT * FROM 
            "${process.env.POSTGRES_SCHEMA}".${process.env.POSTGRES_MESSAGES_TABLE} 
            ORDER BY id ASC
        `,
    );

    createLog("info", "[REPOSITORY] Messages fetched", req, null);

    return rows;
}

module.exports = {
    getMessageById,
    createMessage,
    getMessages,
};
