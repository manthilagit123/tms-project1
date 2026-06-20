const jwt = require('jsonwebtoken');
const env = require('../config/env');

exports.signToken = (user) =>
    jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '1h' });

exports.verifyToken = (token) => jwt.verify(token, env.JWT_SECRET);