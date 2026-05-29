const router = require('express').Router();
const { body, param } = require('express-validator');
const {
  listAdmin, create, update, remove,
} = require('../../controllers/categoryController');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');

router.use(authenticate, requireAdmin);

/**
 * @openapi
 * /api/admin/categories:
 *   get:
 *     tags: [Categories (admin)]
 *     summary: List all categories (including inactive)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Full category list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *             example:
 *               data:
 *                 - id: 1
 *                   name: Sedan
 *                   description: Compact and mid-size sedans
 *                   is_active: true
 *                 - id: 6
 *                   name: Classic
 *                   description: Vintage and collector vehicles
 *                   is_active: false
 */
router.get('/', listAdmin);

/**
 * @openapi
 * /api/admin/categories:
 *   post:
 *     tags: [Categories (admin)]
 *     summary: Create a new category
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
 *               name:
 *                 type: string
 *                 example: Electric
 *               description:
 *                 type: string
 *                 example: Fully electric and plug-in hybrid vehicles
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *             example:
 *               data:
 *                 id: 7
 *                 name: Electric
 *                 description: Fully electric and plug-in hybrid vehicles
 *                 is_active: true
 *       409:
 *         description: Category name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', [body('name').notEmpty().trim()], validate, create);

/**
 * @openapi
 * /api/admin/categories/{id}:
 *   put:
 *     tags: [Categories (admin)]
 *     summary: Update a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 7 }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electric & Hybrid
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', [param('id').isInt(), body('name').optional().trim()], validate, update);

/**
 * @openapi
 * /api/admin/categories/{id}:
 *   delete:
 *     tags: [Categories (admin)]
 *     summary: Delete a category (fails if vehicles are linked)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 7 }
 *     responses:
 *       200:
 *         description: Category deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Category deleted
 *       409:
 *         description: Cannot delete – has associated vehicles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', [param('id').isInt()], validate, remove);

module.exports = router;
