const router = require('express').Router();
const { body, param } = require('express-validator');
const { listAdmin, create, update, remove } = require('../../controllers/serviceTypeController');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');

router.use(authenticate, requireAdmin);

const nameRule = [body('name').notEmpty().trim().withMessage('El nombre es obligatorio')];

/**
 * @openapi
 * /api/admin/service-types:
 *   get:
 *     tags: [Service types (admin)]
 *     summary: List all service types
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Full list (includes status and timestamps)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceType'
 *   post:
 *     tags: [Service types (admin)]
 *     summary: Create a service type
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: Transporte VIP }
 *               status: { type: boolean, example: true }
 *     responses:
 *       201:
 *         description: Created
 *       409:
 *         description: Name already exists
 */
router.get('/', listAdmin);

/**
 * @openapi
 * /api/admin/service-types/{id}:
 *   put:
 *     tags: [Service types (admin)]
 *     summary: Update a service type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               status: { type: boolean }
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 *       409:
 *         description: Name already exists
 *   delete:
 *     tags: [Service types (admin)]
 *     summary: Delete a service type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Deleted
 *       409:
 *         description: In use by vehicles
 */
router.post('/', nameRule, validate, create);
router.put('/:id', [param('id').isInt(), ...nameRule], validate, update);
router.delete('/:id', [param('id').isInt()], validate, remove);

module.exports = router;
