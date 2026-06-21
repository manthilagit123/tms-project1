const rateLimit = require('express-rate-limit');

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { code: 429, message: 'Too many login attempts, please try again later' },
});

exports.generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { code: 429, message: 'Too many requests, please slow down' },
});