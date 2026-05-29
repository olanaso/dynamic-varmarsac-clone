const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Vehicle, Category, ServiceType } = require('../models');
const buildVehicleFilters = require('../utils/buildVehicleFilters');
const buildPublicVehicleFilters = require('../utils/buildPublicVehicleFilters');
const { parseEquipamiento } = require('../utils/equipamiento');

const CATEGORY_INCLUDE = { model: Category, as: 'category', attributes: ['id', 'name'] };
const SERVICE_TYPE_INCLUDE = {
  model: ServiceType,
  as: 'serviceTypes',
  attributes: ['id', 'name', 'status'],
  through: { attributes: [] },
};
const INCLUDES = [CATEGORY_INCLUDE, SERVICE_TYPE_INCLUDE];
const PUBLIC_RESPONSE_OMIT = [
  'registration_number',
  'current_mileage',
  'kilometraje_mantenimiento',
  'is_approved',
  'createdAt',
  'updatedAt',
];
// Excluir en consulta solo campos que no rompen ORDER BY (p. ej. createdAt)
const PUBLIC_ATTRIBUTES = {
  exclude: ['registration_number', 'current_mileage', 'kilometraje_mantenimiento', 'is_approved'],
};
const UPLOADS_BASE = `${(process.env.URL_BASE || 'http://localhost:3000').replace(/\/$/, '')}/uploads`;

function getPublicIncludes(serviceTypeIds) {
  if (!serviceTypeIds || !serviceTypeIds.length) return INCLUDES;
  return [
    CATEGORY_INCLUDE,
    {
      ...SERVICE_TYPE_INCLUDE,
      where: { id: serviceTypeIds.length === 1 ? serviceTypeIds[0] : { [Op.in]: serviceTypeIds } },
      required: true,
    },
  ];
}

function formatPublicVehicle(vehicle) {
  const plain = vehicle.get ? vehicle.get({ plain: true }) : { ...vehicle };
  for (const field of PUBLIC_RESPONSE_OMIT) {
    delete plain[field];
  }
  if (plain.image) {
    plain.image = `${UPLOADS_BASE}/${plain.image}`;
  }
  return plain;
}

function parseBool(val) {
  if (typeof val === 'boolean') return val;
  return val === 'true' || val === '1' || val === 'on';
}

function parseOptionalInt(val) {
  if (val === undefined || val === null || val === '') return null;
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}

function parseServiceTypeIds(val) {
  if (val === undefined) return null; // null = don't touch associations
  const arr = Array.isArray(val) ? val : (val ? [val] : []);
  return arr.map(Number).filter(Boolean);
}

function parseVehicleNumericFields(data) {
  if ('cantidad_pasajeros' in data) {
    data.cantidad_pasajeros = parseInt(data.cantidad_pasajeros, 10);
  }
  if ('precio_mensual' in data) {
    data.precio_mensual = parseFloat(data.precio_mensual);
  }
  if ('daily_rate' in data) {
    data.daily_rate = parseFloat(data.daily_rate);
  }
  return data;
}

// ─── Public ───────────────────────────────────────────────────────────────────

async function listPublic(req, res) {
  try {
    const { where, order, limit, offset, meta, serviceTypeIds } = buildPublicVehicleFilters(req.query);
    const { count, rows } = await Vehicle.findAndCountAll({
      where,
      order,
      limit,
      offset,
      attributes: PUBLIC_ATTRIBUTES,
      include: getPublicIncludes(serviceTypeIds),
      distinct: true,
    });
    res.json({
      data: rows.map(formatPublicVehicle),
      pagination: {
        total: count,
        page: meta.page,
        limit: meta.limit,
        totalPages: Math.ceil(count / meta.limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPublic(req, res) {
  try {
    const vehicle = await Vehicle.findOne({
      where: { id: req.params.id, is_approved: true },
      attributes: PUBLIC_ATTRIBUTES,
      include: INCLUDES,
    });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ data: formatPublicVehicle(vehicle) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ─── Admin ────────────────────────────────────────────────────────────────────

async function listAdmin(req, res) {
  try {
    const { where, order, limit, offset, meta } = buildVehicleFilters(req.query);
    const { count, rows } = await Vehicle.findAndCountAll({
      where, order, limit, offset,
      include: INCLUDES,
      distinct: true,
    });
    res.json({
      data: rows,
      pagination: {
        total: count,
        page: meta.page,
        limit: meta.limit,
        totalPages: Math.ceil(count / meta.limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getAdmin(req, res) {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, { include: INCLUDES });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ data: vehicle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;

    if ('is_approved' in data) data.is_approved = parseBool(data.is_approved);
    if ('homologado' in data) data.homologado = parseBool(data.homologado);

    const kmMaint = parseOptionalInt(data.kilometraje_mantenimiento);
    if (kmMaint !== null) {
      const kmCurr = parseInt(data.current_mileage ?? 0, 10);
      if (kmMaint <= kmCurr) {
        return res.status(400).json({ message: 'El kilometraje de mantenimiento debe ser mayor al kilometraje actual.' });
      }
    }
    data.kilometraje_mantenimiento = kmMaint;
    parseVehicleNumericFields(data);
    if ('equipamiento' in data) data.equipamiento = parseEquipamiento(data.equipamiento);

    const serviceTypeIds = parseServiceTypeIds(data.service_type_ids);
    delete data.service_type_ids;

    const vehicle = await Vehicle.create(data);
    if (serviceTypeIds !== null) await vehicle.setServiceTypes(serviceTypeIds);

    const result = await Vehicle.findByPk(vehicle.id, { include: INCLUDES });
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const data = { ...req.body };
    if (req.file) {
      deleteOldImage(vehicle.image);
      data.image = req.file.filename;
    }

    if ('is_approved' in data) data.is_approved = parseBool(data.is_approved);
    if ('homologado' in data) data.homologado = parseBool(data.homologado);

    const kmMaint = parseOptionalInt(data.kilometraje_mantenimiento);
    if (kmMaint !== null) {
      const kmCurr = parseInt(data.current_mileage ?? vehicle.current_mileage ?? 0, 10);
      if (kmMaint <= kmCurr) {
        return res.status(400).json({ message: 'El kilometraje de mantenimiento debe ser mayor al kilometraje actual.' });
      }
    }
    data.kilometraje_mantenimiento = kmMaint;
    parseVehicleNumericFields(data);
    if ('equipamiento' in data) data.equipamiento = parseEquipamiento(data.equipamiento);

    const serviceTypeIds = parseServiceTypeIds(data.service_type_ids);
    delete data.service_type_ids;

    await vehicle.update(data);
    if (serviceTypeIds !== null) await vehicle.setServiceTypes(serviceTypeIds);

    const result = await Vehicle.findByPk(vehicle.id, { include: INCLUDES });
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function approve(req, res) {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    await vehicle.update({ is_approved: true });
    res.json({ message: 'Vehicle approved', data: vehicle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    deleteOldImage(vehicle.image);
    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function deleteOldImage(filename) {
  if (!filename) return;
  const filePath = path.join(__dirname, '../../uploads', filename);
  fs.unlink(filePath, () => {});
}

module.exports = { listPublic, getPublic, listAdmin, getAdmin, create, update, approve, remove };
