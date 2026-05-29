const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const {
  parseEquipamientoFromDb,
  stringifyEquipamiento,
  EMPTY_EQUIPAMIENTO_JSON,
} = require('../utils/equipamiento');

const Vehicle = sequelize.define('Vehicle', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  make: { type: DataTypes.STRING(100), allowNull: false },
  registration_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'categories', key: 'id' },
  },
  year: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  daily_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  precio_mensual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  cantidad_pasajeros: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    validate: { min: 1 },
  },
  tipo_transmision: {
    type: DataTypes.ENUM('MANUAL', 'AUTOMATICA'),
    allowNull: false,
  },
  tipo_combustible: {
    type: DataTypes.ENUM('GASOLINA', 'DIESEL', 'ELECTRICO', 'HIBRIDO', 'GNV', 'GLP'),
    allowNull: false,
  },
  tipo_traccion: {
    type: DataTypes.ENUM('DELANTERA', 'TRASERA', 'AWD', '4X4', '4X2'),
    allowNull: false,
  },
  current_mileage: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
  kilometraje_mantenimiento: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.ENUM('AVAILABLE', 'RENTED', 'MAINTENANCE'),
    defaultValue: 'AVAILABLE',
    allowNull: false,
  },
  is_approved: { type: DataTypes.BOOLEAN, defaultValue: false },
  homologado: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  equipamiento: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    get() {
      return parseEquipamientoFromDb(this.getDataValue('equipamiento'));
    },
    set(value) {
      this.setDataValue('equipamiento', stringifyEquipamiento(value));
    },
  },
}, {
  tableName: 'vehicles',
  timestamps: true,
  hooks: {
    beforeValidate: (vehicle) => {
      if (vehicle.equipamiento === undefined || vehicle.equipamiento === null) {
        vehicle.equipamiento = EMPTY_EQUIPAMIENTO_JSON;
      }
    },
  },
});

module.exports = Vehicle;
