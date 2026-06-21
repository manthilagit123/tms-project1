const router = require('express').Router();
const { createUserHandler, listUsersHandler } = require('./users.controller');
const authenticate = require('../../middlewares/jwt.middleware');
const requireRole = require('../../middlewares/rbac.middleware');
const validate = require('../../middlewares/validate.middleware');
const { createUserSchema } = require('./users.validation');

router.post('/', authenticate, requireRole('Admin'), validate(createUserSchema), createUserHandler);
router.get('/', authenticate, requireRole('Admin'), listUsersHandler);

module.exports = router;
