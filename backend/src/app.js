const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes get mounted here as each module is built
// app.use('/api/auth', require('./modules/auth/auth.routes'));
// app.use('/api/users', require('./modules/users/users.routes'));

module.exports = app;
