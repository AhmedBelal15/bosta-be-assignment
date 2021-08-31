const express= require('express');
const app = express()

// Import route files
const auth = require('./routes/auth');
const checks = require('./routes/checks')
const reports = require('./routes/reports')

// Mount routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/checks', checks)
app.use('/api/v1/reports', reports)

module.exports = app;