const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceType = sequelize.define('ServiceType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  status: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
}, {
  tableName: 'service_types',
  timestamps: true,
});

module.exports = ServiceType;
