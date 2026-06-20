module.exports = function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ code: 401, message: 'Not authenticated' });
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ code: 403, message: 'Forbidden: insufficient role' });
        }
        next();
    };
};