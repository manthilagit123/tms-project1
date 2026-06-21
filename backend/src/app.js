const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const { authLimiter, generalLimiter } = require('./middlewares/rateLimiter');
const sanitize = require('./middlewares/sanitize.middleware');

const app = express();

// Security headers
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Security middlewares
app.use(sanitize);
app.use(generalLimiter);
app.use('/api/auth/login', authLimiter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/notifications', require('./modules/notifications/notifications.routes'));

// Error handler — must be LAST
app.use(errorHandler);

module.exports = app;