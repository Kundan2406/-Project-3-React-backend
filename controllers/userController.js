// controllers/userController.js
const pool = require('../db');

exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query('INSERT INTO users (username, email, password, confirmpassword) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword, hashedPassword]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const result = await pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
            [username, email, id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
