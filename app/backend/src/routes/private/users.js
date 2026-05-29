const router = require('express').Router();
const { body, param } = require('express-validator');
const { list, getOne, create, updateRole, remove } = require('../../controllers/userController');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');

router.use(authenticate, requireAdmin);

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     tags: [Users (admin)]
 *     summary: List all registered users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *             example:
 *               data:
 *                 - id: 1
 *                   email: admin@barmar.com
 *                   role: admin
 *                   is_active: true
 *                   createdAt: "2025-01-10T08:00:00.000Z"
 *                 - id: 2
 *                   email: jorge@barmar.com
 *                   role: user
 *                   is_active: true
 *                   createdAt: "2025-02-15T14:30:00.000Z"
 */
/**
 * @openapi
 * /api/admin/users:
 *   post:
 *     tags: [Users (admin)]
 *     summary: Create a new user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User created
 *       409:
 *         description: Email already registered
 */
router.post('/', [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('nombre_completo').optional({ checkFalsy: true }).isString().trim(),
  body('celular').optional({ checkFalsy: true }).isString().trim(),
  body('numero_documento').optional({ checkFalsy: true }).isString().trim(),
  body('role').optional().isIn(['admin', 'user']),
  body('is_active').optional().isBoolean(),
], validate, create);

router.get('/', list);

/**
 * @openapi
 * /api/admin/users/{id}:
 *   get:
 *     tags: [Users (admin)]
 *     summary: Get a single user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 2 }
 *     responses:
 *       200:
 *         description: User detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', [param('id').isInt()], validate, getOne);

/**
 * @openapi
 * /api/admin/users/{id}:
 *   patch:
 *     tags: [Users (admin)]
 *     summary: Update user role or active state
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 2 }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: admin
 *               is_active:
 *                 type: boolean
 *                 example: false
 *           examples:
 *             promote_to_admin:
 *               summary: Promote to admin
 *               value: { role: admin }
 *             deactivate:
 *               summary: Deactivate user
 *               value: { is_active: false }
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 id: 2
 *                 email: jorge@barmar.com
 *                 role: admin
 *                 is_active: true
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id', [
  param('id').isInt(),
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('nombre_completo').optional({ checkFalsy: false }).isString().trim(),
  body('celular').optional({ checkFalsy: false }).isString().trim(),
  body('numero_documento').optional({ checkFalsy: false }).isString().trim(),
  body('role').optional().isIn(['admin', 'user']),
  body('is_active').optional().isBoolean(),
], validate, updateRole);

/**
 * @openapi
 * /api/admin/users/{id}:
 *   delete:
 *     tags: [Users (admin)]
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 2 }
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', [param('id').isInt()], validate, remove);

module.exports = router;
