// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, email, password, confirmpassword) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, hashedPassword, hashedPassword]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful',token, user: { id: user.id, email: user.email, username: user.username } });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ error: 'Server error' });
        
    }
};
