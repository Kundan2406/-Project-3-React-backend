// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getChats, postChat } = require('../controllers/chatController');
// const authenticate = require('../middleware/authenticate');

router.get('/', getChats);
router.post('/', postChat);

module.exports = router;
