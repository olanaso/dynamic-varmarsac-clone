const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No se proporciona ningún token' });
  }

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id, {
      attributes: ['id', 'email', 'nombre_completo', 'role', 'is_active'],
    });
    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'Usuario inválido o inactivo' });
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Se requiere acceso de administrador' });
  }
  next();
}

module.exports = { authenticate, requireAdmin };
