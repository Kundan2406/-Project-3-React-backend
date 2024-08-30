// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/users', userRoutes);
app.use('/uploads', uploadRoutes);
app.use('/chats', chatRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
