const { User } = require('../models');

async function create(req, res) {
  const { email, password, role = 'admin', is_active = true, nombre_completo, celular, numero_documento } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'El correo electrónico ya se encuentra registrado.' });
    const user = await User.create({ email, password, role, is_active, nombre_completo, celular, numero_documento });
    res.status(201).json({
      data: { id: user.id, email: user.email, nombre_completo: user.nombre_completo, celular: user.celular, numero_documento: user.numero_documento, role: user.role, is_active: user.is_active, createdAt: user.createdAt },
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
      const messages = err.errors && err.errors.length > 0
        ? err.errors.map(e => {
            if (e.path === 'email' || e.message.toLowerCase().includes('email') || e.validatorKey === 'not_unique') {
              return 'El correo electrónico ya se encuentra registrado.';
            }
            return e.message;
          }).join(' · ')
        : 'El correo electrónico ya se encuentra registrado.';
      return res.status(409).json({ message: messages });
    }
    res.status(500).json({ message: err.message });
  }
}

const USER_ATTRS = ['id', 'email', 'nombre_completo', 'celular', 'numero_documento', 'role', 'is_active', 'createdAt'];

async function list(req, res) {
  try {
    const users = await User.findAll({
      attributes: USER_ATTRS,
      order: [['createdAt', 'DESC']],
    });
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getOne(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: USER_ATTRS,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateRole(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.body.email) {
      const { Op } = require('sequelize');
      const exists = await User.findOne({
        where: {
          email: req.body.email,
          id: { [Op.ne]: req.params.id }
        }
      });
      if (exists) {
        return res.status(409).json({ message: 'El correo electrónico ya se encuentra registrado por otro usuario.' });
      }
    }

    const updates = {};
    if (req.body.role !== undefined) updates.role = req.body.role;
    if (req.body.is_active !== undefined) updates.is_active = req.body.is_active;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) updates.password = req.body.password;
    if (req.body.nombre_completo !== undefined) updates.nombre_completo = req.body.nombre_completo || null;
    if (req.body.celular !== undefined) updates.celular = req.body.celular || null;
    if (req.body.numero_documento !== undefined) updates.numero_documento = req.body.numero_documento || null;
    await user.update(updates);
    res.json({ data: { id: user.id, email: user.email, nombre_completo: user.nombre_completo, celular: user.celular, numero_documento: user.numero_documento, role: user.role, is_active: user.is_active } });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
      const messages = err.errors && err.errors.length > 0
        ? err.errors.map(e => {
            if (e.path === 'email' || e.message.toLowerCase().includes('email') || e.validatorKey === 'not_unique') {
              return 'El correo electrónico ya se encuentra registrado por otro usuario.';
            }
            return e.message;
          }).join(' · ')
        : 'El correo electrónico ya se encuentra registrado por otro usuario.';
      return res.status(409).json({ message: messages });
    }
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { list, getOne, create, updateRole, remove };
