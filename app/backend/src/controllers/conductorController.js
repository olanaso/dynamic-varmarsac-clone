const { Conductor } = require('../models');

const ATTRS = ['id', 'nombre_completo', 'numero_documento', 'celular', 'createdAt'];

async function list(req, res) {
  try {
    const conductores = await Conductor.findAll({ attributes: ATTRS, order: [['nombre_completo', 'ASC']] });
    res.json({ data: conductores });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getOne(req, res) {
  try {
    const c = await Conductor.findByPk(req.params.id, { attributes: ATTRS });
    if (!c) return res.status(404).json({ message: 'Conductor no encontrado.' });
    res.json({ data: c });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  const { nombre_completo, numero_documento, celular } = req.body;
  try {
    const exists = await Conductor.findOne({ where: { numero_documento } });
    if (exists) return res.status(409).json({ message: 'Ya existe un conductor con ese número de documento.' });
    const c = await Conductor.create({ nombre_completo, numero_documento, celular: celular || null });
    res.status(201).json({
      data: { id: c.id, nombre_completo: c.nombre_completo, numero_documento: c.numero_documento, celular: c.celular, createdAt: c.createdAt },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const c = await Conductor.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Conductor no encontrado.' });

    if (req.body.numero_documento !== undefined) {
      const { Op } = require('sequelize');
      const exists = await Conductor.findOne({
        where: { numero_documento: req.body.numero_documento, id: { [Op.ne]: req.params.id } }
      });
      if (exists) {
        return res.status(409).json({ message: 'El N° de documento ya se encuentra registrado por otro conductor.' });
      }
    }

    const updates = {};
    if (req.body.nombre_completo !== undefined) updates.nombre_completo = req.body.nombre_completo;
    if (req.body.numero_documento !== undefined) updates.numero_documento = req.body.numero_documento;
    if (req.body.celular !== undefined) updates.celular = req.body.celular || null;
    await c.update(updates);
    res.json({
      data: { id: c.id, nombre_completo: c.nombre_completo, numero_documento: c.numero_documento, celular: c.celular, createdAt: c.createdAt },
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
      const isDocumento = err.errors && err.errors.some(e =>
        e.path === 'numero_documento' || e.validatorKey === 'not_unique'
      );
      return res.status(409).json({
        message: isDocumento
          ? 'El N° de documento ya se encuentra registrado por otro conductor.'
          : 'Ya existe un registro con esos datos.',
      });
    }
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const c = await Conductor.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Conductor no encontrado.' });
    await c.destroy();
    res.json({ message: 'Conductor eliminado.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { list, getOne, create, update, remove };
