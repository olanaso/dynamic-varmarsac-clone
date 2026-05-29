const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conductor = sequelize.define('Conductor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_completo: { type: DataTypes.STRING(200), allowNull: false },
  numero_documento: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  celular: { type: DataTypes.STRING(20), allowNull: true },
}, {
  tableName: 'conductores',
  timestamps: true,
});

module.exports = Conductor;
