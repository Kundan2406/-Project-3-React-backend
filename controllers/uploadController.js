// controllers/uploadController.js
const pool = require('../db');

const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add Upload (with file)
exports.addUpload = [
    upload.single('file'),
    async (req, res) => {
        const { userid } = req.body;
        const { file_label } = req.body;
        const file_path = req.file.path;

        try {
            const result = await pool.query(
                'INSERT INTO uploads (id, userid, filelabel, filename) VALUES ($1, $2, $3, $4) RETURNING *',
                [userid, file_label, file_path]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Database error.' });
        }
    }
];


exports.getUploads = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM uploads');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.uploadFile = async (req, res) => {
    
    const { filename, filelabel, userid } = req.body;

    try {
        const result = await pool.query('INSERT INTO uploads (userid, filelabel, filename) VALUES ($1, $2, $3) RETURNING *', [userid, filelabel, filename]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUpload = async (req, res) => {
    const { id } = req.params;
    const { filelabel } = req.body;
    console.log(req.body);
    try {
        const result = await pool.query('UPDATE uploads SET filelabel = $1 WHERE id = $2 RETURNING *', [filelabel, id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUpload = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM uploads WHERE id = $1', [id]);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
