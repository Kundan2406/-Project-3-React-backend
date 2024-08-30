// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getUploads, uploadFile, updateUpload, deleteUpload } = require('../controllers/uploadController');
// const authenticate = require('../middleware/authenticate');

// const upload = multer({ dest: 'uploads/' });
// router.post('/', upload.single('file'), uploadFile);

router.get('/',  getUploads);
router.post('/', uploadFile);
router.put('/:id', updateUpload);
router.delete('/:id', deleteUpload);

module.exports = router;
