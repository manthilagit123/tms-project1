const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const { authLimiter, generalLimiter } = require('./middlewares/rateLimiter');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Rate limiting
app.use(generalLimiter);
app.use('/api/auth/login', authLimiter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/notifications', require('./modules/notifications/notifications.routes'));

// Error handler — must be LAST
app.use(errorHandler);

module.exports = app;