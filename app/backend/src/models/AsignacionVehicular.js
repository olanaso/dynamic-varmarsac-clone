const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AsignacionVehicular = sequelize.define('AsignacionVehicular', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  conductor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'conductores', key: 'id' },
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'vehicles', key: 'id' },
  },
  fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_limite: { type: DataTypes.DATEONLY, allowNull: false },
  estado: {
    type: DataTypes.ENUM('activa', 'cancelada'),
    defaultValue: 'activa',
    allowNull: false,
  },
}, {
  tableName: 'asignaciones_vehiculares',
  timestamps: true,
});

module.exports = AsignacionVehicular;
