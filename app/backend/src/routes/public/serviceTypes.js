const router = require('express').Router();
const { listPublic } = require('../../controllers/serviceTypeController');

/**
 * @openapi
 * /api/service-types:
 *   get:
 *     tags: [Service types (public)]
 *     summary: List active service types
 *     description: |
 *       Returns service types with `status = true`, exposing only **id** and **name**.
 *       Intended for public filters and vehicle catalog UI.
 *     responses:
 *       200:
 *         description: List of service types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceTypePublic'
 *             example:
 *               data:
 *                 - id: 1
 *                   name: Transporte de Pasajeros
 *                 - id: 2
 *                   name: Carga y Logística
 *                 - id: 7
 *                   name: Aeropuerto
 */
router.get('/', listPublic);

module.exports = router;
