require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Load all routes dynamically from routes folder
readdirSync('./routes').forEach((route) => {
    app.use('/api/v1', require(`./routes/${route}`));
});

// Connect DB and Start Server
const startServer = async () => {
    await db();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port: ${PORT}`);
    });
};

startServer();
