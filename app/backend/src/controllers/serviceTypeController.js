const { ServiceType } = require('../models');

function formatPublicServiceType(type) {
  return { id: type.id, name: type.name };
}

async function listPublic(req, res) {
  try {
    const types = await ServiceType.findAll({
      where: { status: true },
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });
    res.json({ data: types.map(formatPublicServiceType) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function listAdmin(req, res) {
  try {
    const types = await ServiceType.findAll({ order: [['name', 'ASC']] });
    res.json({ data: types });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  try {
    const { name, status } = req.body;
    const exists = await ServiceType.findOne({ where: { name } });
    if (exists) return res.status(409).json({ message: 'El tipo de servicio ya existe' });
    const type = await ServiceType.create({
      name,
      status: status !== undefined ? (status === true || status === 'true') : true,
    });
    res.status(201).json({ data: type });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const type = await ServiceType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Tipo de servicio no encontrado' });

    const payload = { ...req.body };
    if (payload.name && payload.name !== type.name) {
      const exists = await ServiceType.findOne({ where: { name: payload.name } });
      if (exists) return res.status(409).json({ message: 'El tipo de servicio ya existe' });
    }
    if ('status' in payload) payload.status = payload.status === true || payload.status === 'true';

    await type.update(payload);
    await type.reload();
    res.json({ data: type });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const type = await ServiceType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Tipo de servicio no encontrado' });
    const count = await type.countVehicles();
    if (count > 0) {
      return res.status(409).json({ message: `No se puede eliminar: ${count} vehículo(s) usan este tipo` });
    }
    await type.destroy();
    res.json({ message: 'Tipo de servicio eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { listPublic, listAdmin, create, update, remove };
