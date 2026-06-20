// ⚠️ TEMPORARY STUB — DO NOT MERGE TO MAIN.
// Replace with Person 1's real implementation when feature/auth-rbac merges to develop.
module.exports = function authenticate(req, res, next) {
    const role = req.headers['x-stub-role'];
    const id = req.headers['x-stub-user-id'];
    if (!role || !id) return res.status(401).json({ code: 401, message: 'No token provided (stub: missing x-stub headers)' });
    req.user = { id, role };
    next();
};