const { AsignacionVehicular, Conductor, Vehicle } = require('../models');
const { Op } = require('sequelize');

const INCLUDE = [
  { model: Conductor, as: 'conductor', attributes: ['id', 'nombre_completo', 'numero_documento'] },
  { model: Vehicle,   as: 'vehicle',   attributes: ['id', 'name', 'registration_number'] },
];

async function list(req, res) {
  try {
    const where = {};
    if (req.query.conductor_id) where.conductor_id = req.query.conductor_id;
    if (req.query.vehicle_id)   where.vehicle_id   = req.query.vehicle_id;
    if (req.query.estado)       where.estado       = req.query.estado;
    const rows = await AsignacionVehicular.findAll({
      where,
      include: INCLUDE,
      order: [['fecha_inicio', 'DESC']],
    });
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  const { conductor_id, vehicle_id, fecha_inicio, fecha_limite } = req.body;
  try {
    if (new Date(fecha_inicio) > new Date(fecha_limite)) {
      return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la fecha límite.' });
    }

    const overlap = await AsignacionVehicular.findOne({
      where: {
        conductor_id,
        estado: 'activa',
        fecha_inicio: { [Op.lte]: fecha_limite },
        fecha_limite: { [Op.gte]: fecha_inicio },
      },
    });
    if (overlap) {
      return res.status(409).json({ message: 'El conductor ya tiene una asignación activa en ese período.' });
    }

    const a = await AsignacionVehicular.create({ conductor_id, vehicle_id, fecha_inicio, fecha_limite, estado: 'activa' });
    const full = await AsignacionVehicular.findByPk(a.id, { include: INCLUDE });
    res.status(201).json({ data: full });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function cancel(req, res) {
  try {
    const a = await AsignacionVehicular.findByPk(req.params.id);
    if (!a) return res.status(404).json({ message: 'Asignación no encontrada.' });
    if (a.estado === 'cancelada') return res.status(400).json({ message: 'La asignación ya está cancelada.' });
    await a.update({ estado: 'cancelada' });
    res.json({ data: a });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const a = await AsignacionVehicular.findByPk(req.params.id);
    if (!a) return res.status(404).json({ message: 'Asignación no encontrada.' });
    await a.destroy();
    res.json({ message: 'Asignación eliminada.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { list, create, cancel, remove };
