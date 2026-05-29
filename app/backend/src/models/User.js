const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: {
    type: DataTypes.STRING(191),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  nombre_completo: { type: DataTypes.STRING(200), allowNull: true },
  celular:         { type: DataTypes.STRING(20),  allowNull: true },
  numero_documento:{ type: DataTypes.STRING(30),  allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
  },
});

User.prototype.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = User;
