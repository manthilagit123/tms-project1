const router = require('express').Router();
const { createUserHandler, listUsersHandler, updateUserHandler, deactivateUserHandler } = require('./users.controller');
const authenticate = require('../../middlewares/jwt.middleware');
const requireRole = require('../../middlewares/rbac.middleware');
const validate = require('../../middlewares/validate.middleware');
const { createUserSchema, updateUserSchema } = require('./users.validation');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, role]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               role: { type: string, enum: [Admin, Project Manager, Collaborator] }
 *     responses:
 *       201:
 *         description: User created
 *       409:
 *         description: Email already in use
 *       403:
 *         description: Not an Admin
 */
router.post('/', authenticate, requireRole('Admin'), validate(createUserSchema), createUserHandler);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List, search, and filter users (Admin only)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: role
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Paginated user list
 *       403:
 *         description: Not an Admin
 */
router.get('/', authenticate, requireRole('Admin'), listUsersHandler);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user's name, role, or active status (Admin only)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               role: { type: string }
 *               is_active: { type: boolean }
 *     responses:
 *       200:
 *         description: Updated user
 *       404:
 *         description: User not found
 *       403:
 *         description: Not an Admin
 */
router.put('/:id', authenticate, requireRole('Admin'), validate(updateUserSchema), updateUserHandler);

/**
 * @swagger
 * /api/users/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User deactivated
 *       404:
 *         description: User not found
 *       403:
 *         description: Not an Admin
 */
router.patch('/:id/deactivate', authenticate, requireRole('Admin'), deactivateUserHandler);

module.exports = router;
