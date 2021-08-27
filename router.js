const express= require('express');
const app = express()

// Import route files
const auth = require('./routes/auth');

// Mount routes
app.use('/api/v1/auth', auth)

module.exports = app;