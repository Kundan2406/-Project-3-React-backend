// controllers/chatController.js
const pool = require('../db');

exports.getChats = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM chats');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.postChat = async (req, res) => {
    const { id, userid, username, message } = req.body;
    try {
        const result = await pool.query('INSERT INTO chats (id, userid, username, message, time ) VALUES ($1, $2, $3, $4, now()) RETURNING *', [id, userid, username, message]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
