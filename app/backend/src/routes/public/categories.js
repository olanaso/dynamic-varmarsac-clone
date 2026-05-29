const router = require('express').Router();
const { listPublic } = require('../../controllers/categoryController');

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags: [Categories (public)]
 *     summary: List active categories
 *     description: Returns all active categories. Typically used to populate filter dropdowns in the web UI.
 *     responses:
 *       200:
 *         description: List of categories
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
 *                 - id: 2
 *                   name: Pickup Truck
 *                   description: Light and heavy duty trucks
 *                 - id: 3
 *                   name: SUV
 *                   description: Sport utility vehicles
 *                 - id: 4
 *                   name: Van
 *                   description: Cargo and passenger vans
 *                 - id: 5
 *                   name: Motorcycle
 *                   description: Sport and touring motorcycles
 */
router.get('/', listPublic);

module.exports = router;
