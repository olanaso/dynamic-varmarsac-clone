const router = require('express').Router();
const { listPublic, getPublic } = require('../../controllers/vehicleController');

/**
 * @openapi
 * /api/vehicles:
 *   get:
 *     tags: [Vehicles (public)]
 *     summary: List approved vehicles (public catalog)
 *     description: |
 *       Returns paginated vehicles with `is_approved = true`.
 *       Filters: multiple categories, multiple service types, homologation.
 *       Image URLs are absolute (`URL_BASE/uploads/...`).
 *     parameters:
 *       - name: category_id
 *         in: query
 *         description: Filter by one or more category IDs (repeat param or comma-separated)
 *         schema:
 *           oneOf:
 *             - type: integer
 *             - type: array
 *               items:
 *                 type: integer
 *         example: 2
 *       - name: categoria_id
 *         in: query
 *         description: Alias for category_id
 *         schema:
 *           type: integer
 *       - name: service_type_id
 *         in: query
 *         description: Filter by one or more service type IDs (vehicles linked to any of them)
 *         schema:
 *           oneOf:
 *             - type: integer
 *             - type: array
 *               items:
 *                 type: integer
 *         example: 1
 *       - name: tipo_servicio_id
 *         in: query
 *         description: Alias for service_type_id
 *         schema:
 *           type: integer
 *       - name: homologado
 *         in: query
 *         description: |
 *           `all` or omit = homologados y no homologados;
 *           `true` / `homologados` = solo homologados;
 *           `false` / `no_homologados` = solo no homologados
 *         schema:
 *           type: string
 *           enum: [all, todos, true, false, homologados, no_homologados]
 *           example: all
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *     responses:
 *       200:
 *         description: Paginated vehicle list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', listPublic);

/**
 * @openapi
 * /api/vehicles/{id}:
 *   get:
 *     tags: [Vehicles (public)]
 *     summary: Get a single approved vehicle
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Vehicle detail
 *       404:
 *         description: Vehicle not found or not approved
 */
router.get('/:id', getPublic);

module.exports = router;
