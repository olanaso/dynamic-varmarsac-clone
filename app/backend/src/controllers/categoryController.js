const { Category, Vehicle } = require('../models');

async function listPublic(req, res) {
  try {
    const categories = await Category.findAll({
      where: { is_active: true },
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function listAdmin(req, res) {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  try {
    const { name, description } = req.body;
    const exists = await Category.findOne({ where: { name } });
    if (exists) return res.status(409).json({ message: 'Category already exists' });

    const category = await Category.create({ name, description });
    res.status(201).json({ data: category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    await category.update(req.body);
    res.json({ data: category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const count = await Vehicle.count({ where: { category_id: req.params.id } });
    if (count > 0) {
      return res.status(409).json({ message: 'Cannot delete category with associated vehicles' });
    }

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { listPublic, listAdmin, create, update, remove };
