const router = require('express').Router();
const { body, param } = require('express-validator');
const { list, getOne, create, update, remove } = require('../../controllers/conductorController');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');

router.use(authenticate, requireAdmin);

router.get('/', list);

router.post('/', [
  body('nombre_completo').notEmpty().withMessage('Nombre completo requerido').isString().trim(),
  body('numero_documento').notEmpty().withMessage('Número de documento requerido').isString().trim(),
  body('celular').optional({ checkFalsy: true }).isString().trim(),
], validate, create);

router.get('/:id', [param('id').isInt()], validate, getOne);

router.patch('/:id', [
  param('id').isInt(),
  body('nombre_completo').optional().isString().trim(),
  body('numero_documento').optional().isString().trim(),
  body('celular').optional({ checkFalsy: false }).isString().trim(),
], validate, update);

router.delete('/:id', [param('id').isInt()], validate, remove);

module.exports = router;
