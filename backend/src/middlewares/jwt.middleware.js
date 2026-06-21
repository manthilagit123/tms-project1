const { verifyToken } = require('../utils/token.util');

module.exports = function authenticate(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ code: 401, message: 'No token provided' });
    try {
        req.user = verifyToken(token);
        next();
    } catch {
        return res.status(401).json({ code: 401, message: 'Invalid or expired token' });
    }
};