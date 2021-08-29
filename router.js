const express= require('express');
const app = express()

// Import route files
const auth = require('./routes/auth');
const checks = require('./routes/checks')

// Mount routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/checks', checks)

module.exports = app;