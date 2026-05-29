const router = require('express').Router();
const { body, param, query } = require('express-validator');
const { list, create, cancel, remove } = require('../../controllers/asignacionController');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');

router.use(authenticate, requireAdmin);

router.get('/', [
  query('conductor_id').optional().isInt(),
  query('vehicle_id').optional().isInt(),
  query('estado').optional().isIn(['activa', 'cancelada']),
], validate, list);

router.post('/', [
  body('conductor_id').isInt({ min: 1 }).withMessage('conductor_id requerido'),
  body('vehicle_id').isInt({ min: 1 }).withMessage('vehicle_id requerido'),
  body('fecha_inicio').isDate().withMessage('Fecha de inicio inválida (YYYY-MM-DD)'),
  body('fecha_limite').isDate().withMessage('Fecha límite inválida (YYYY-MM-DD)'),
], validate, create);

router.patch('/:id/cancelar', [param('id').isInt()], validate, cancel);

router.delete('/:id', [param('id').isInt()], validate, remove);

module.exports = router;
