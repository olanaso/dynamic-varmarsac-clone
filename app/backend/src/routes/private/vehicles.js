const router = require('express').Router();
const { body, param } = require('express-validator');
const {
  listAdmin, getAdmin, create, update, approve, remove,
} = require('../../controllers/vehicleController');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const validate = require('../../middleware/validate');

router.use(authenticate, requireAdmin);

const vehicleRules = [
  body('name').notEmpty().trim(),
  body('make').notEmpty().trim(),
  body('registration_number').notEmpty().trim(),
  body('category_id').isInt({ min: 1 }),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }),
  body('daily_rate').isFloat({ min: 0 }),
  body('precio_mensual').isFloat({ min: 0 }),
  body('cantidad_pasajeros').isInt({ min: 1, max: 99 }),
  body('tipo_transmision').isIn(['MANUAL', 'AUTOMATICA']),
  body('tipo_combustible').isIn(['GASOLINA', 'DIESEL', 'ELECTRICO', 'HIBRIDO', 'GNV', 'GLP']),
  body('tipo_traccion').isIn(['DELANTERA', 'TRASERA', 'AWD', '4X4', '4X2']),
  body('current_mileage').isInt({ min: 0 }),
  body('status').optional().isIn(['AVAILABLE', 'RENTED', 'MAINTENANCE']),
  body('kilometraje_mantenimiento')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 }),
];

/**
 * @openapi
 * /api/admin/vehicles:
 *   get:
 *     tags: [Vehicles (admin)]
 *     summary: List all vehicles (all statuses, approved or not)
 *     description: |
 *       Same filters as the public endpoint plus two admin-only filters:
 *       `status` and `is_approved`. No automatic filtering is applied.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *         schema: { type: string, example: BMW }
 *       - name: make
 *         in: query
 *         schema: { type: string, example: BMW }
 *       - name: category_id
 *         in: query
 *         schema: { type: integer, example: 3 }
 *       - name: year_from
 *         in: query
 *         schema: { type: integer, example: 2019 }
 *       - name: year_to
 *         in: query
 *         schema: { type: integer, example: 2024 }
 *       - name: min_rate
 *         in: query
 *         schema: { type: number, example: 50 }
 *       - name: max_rate
 *         in: query
 *         schema: { type: number, example: 200 }
 *       - name: min_mileage
 *         in: query
 *         schema: { type: integer, example: 0 }
 *       - name: max_mileage
 *         in: query
 *         schema: { type: integer, example: 100000 }
 *       - name: status
 *         in: query
 *         description: "Admin only – filter by vehicle status"
 *         schema:
 *           type: string
 *           enum: [AVAILABLE, RENTED, MAINTENANCE]
 *       - name: is_approved
 *         in: query
 *         description: "Admin only – filter by approval state"
 *         schema:
 *           type: boolean
 *           example: false
 *       - $ref: '#/components/parameters/sortByParam'
 *       - $ref: '#/components/parameters/sortOrderParam'
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *     responses:
 *       200:
 *         description: Paginated vehicle list (unfiltered by approval/status)
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
 *             example:
 *               data:
 *                 - id: 3
 *                   name: X5 xDrive40i
 *                   make: BMW
 *                   registration_number: GHI-9012
 *                   category_id: 3
 *                   category: { id: 3, name: SUV }
 *                   year: 2024
 *                   daily_rate: 180.00
 *                   current_mileage: 3200
 *                   status: AVAILABLE
 *                   is_approved: false
 *                   image: bmw_x5.jpg
 *                   description: Pending review – dealer submission
 *               pagination:
 *                 total: 1
 *                 page: 1
 *                 limit: 12
 *                 totalPages: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', listAdmin);

/**
 * @openapi
 * /api/admin/vehicles/{id}:
 *   get:
 *     tags: [Vehicles (admin)]
 *     summary: Get any vehicle by ID (regardless of approval)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 3 }
 *     responses:
 *       200:
 *         description: Vehicle detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getAdmin);

/**
 * @openapi
 * /api/admin/vehicles:
 *   post:
 *     tags: [Vehicles (admin)]
 *     summary: Create a new vehicle
 *     description: Accepts `multipart/form-data` so an image file can be uploaded together with the vehicle data.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, make, registration_number, category_id, year, daily_rate, current_mileage]
 *             properties:
 *               name:
 *                 type: string
 *                 example: X5 xDrive40i
 *               make:
 *                 type: string
 *                 example: BMW
 *               registration_number:
 *                 type: string
 *                 example: GHI-9012
 *               category_id:
 *                 type: integer
 *                 example: 3
 *               year:
 *                 type: integer
 *                 example: 2024
 *               daily_rate:
 *                 type: number
 *                 example: 180.00
 *               current_mileage:
 *                 type: integer
 *                 example: 0
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, RENTED, MAINTENANCE]
 *                 example: AVAILABLE
 *               description:
 *                 type: string
 *                 example: Full option, panoramic roof
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Vehicle created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post('/', upload.single('image'), vehicleRules, validate, create);

/**
 * @openapi
 * /api/admin/vehicles/{id}:
 *   put:
 *     tags: [Vehicles (admin)]
 *     summary: Update a vehicle (full update)
 *     description: Same body as POST. If a new image is uploaded the old one is deleted from disk.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 3 }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, make, registration_number, category_id, year, daily_rate, current_mileage]
 *             properties:
 *               name:
 *                 type: string
 *                 example: X5 xDrive40i
 *               make:
 *                 type: string
 *                 example: BMW
 *               registration_number:
 *                 type: string
 *                 example: GHI-9012
 *               category_id:
 *                 type: integer
 *                 example: 3
 *               year:
 *                 type: integer
 *                 example: 2024
 *               daily_rate:
 *                 type: number
 *                 example: 195.00
 *               current_mileage:
 *                 type: integer
 *                 example: 500
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, RENTED, MAINTENANCE]
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Vehicle updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', upload.single('image'), vehicleRules, validate, update);

/**
 * @openapi
 * /api/admin/vehicles/{id}/approve:
 *   patch:
 *     tags: [Vehicles (admin)]
 *     summary: Approve a vehicle (sets is_approved = true)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 3 }
 *     responses:
 *       200:
 *         description: Vehicle approved
 *         content:
 *           application/json:
 *             example:
 *               message: Vehicle approved
 *               data:
 *                 id: 3
 *                 name: X5 xDrive40i
 *                 is_approved: true
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id/approve', [param('id').isInt()], validate, approve);

/**
 * @openapi
 * /api/admin/vehicles/{id}:
 *   delete:
 *     tags: [Vehicles (admin)]
 *     summary: Delete a vehicle and its image file
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 3 }
 *     responses:
 *       200:
 *         description: Vehicle deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Vehicle deleted
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', [param('id').isInt()], validate, remove);

module.exports = router;
