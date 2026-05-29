const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Vehicle = require('./Vehicle');
const ServiceType = require('./ServiceType');
const Conductor = require('./Conductor');
const AsignacionVehicular = require('./AsignacionVehicular');

// Category ↔ Vehicle
Category.hasMany(Vehicle, { foreignKey: 'category_id', as: 'vehicles' });
Vehicle.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Vehicle ↔ ServiceType (many-to-many)
Vehicle.belongsToMany(ServiceType, {
  through: 'vehicle_service_types',
  foreignKey: 'vehicle_id',
  otherKey: 'service_type_id',
  as: 'serviceTypes',
});
ServiceType.belongsToMany(Vehicle, {
  through: 'vehicle_service_types',
  foreignKey: 'service_type_id',
  otherKey: 'vehicle_id',
  as: 'vehicles',
});

// Conductor ↔ AsignacionVehicular
Conductor.hasMany(AsignacionVehicular, { foreignKey: 'conductor_id', as: 'asignaciones' });
AsignacionVehicular.belongsTo(Conductor, { foreignKey: 'conductor_id', as: 'conductor' });

// Vehicle ↔ AsignacionVehicular
Vehicle.hasMany(AsignacionVehicular, { foreignKey: 'vehicle_id', as: 'asignaciones' });
AsignacionVehicular.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

module.exports = { sequelize, User, Category, Vehicle, ServiceType, Conductor, AsignacionVehicular };
