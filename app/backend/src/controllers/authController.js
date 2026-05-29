const { User } = require('../models');
const { signToken } = require('../utils/jwt');

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({ email, password });
    const token = signToken({ id: user.id, role: user.role });
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = signToken({ id: user.id, role: user.role });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, me };
