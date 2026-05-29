const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/auth');
const publicVehicleRoutes = require('./routes/public/vehicles');
const publicCategoryRoutes = require('./routes/public/categories');
const privateVehicleRoutes = require('./routes/private/vehicles');
const privateCategoryRoutes = require('./routes/private/categories');
const privateUserRoutes = require('./routes/private/users');
const publicServiceTypeRoutes = require('./routes/public/serviceTypes');
const privateServiceTypeRoutes = require('./routes/private/serviceTypes');
const privateConductorRoutes = require('./routes/private/conductores');
const privateAsignacionRoutes = require('./routes/private/asignaciones');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'VARMAR API Docs',
  swaggerOptions: { persistAuthorization: true },
}));
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve public static folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', publicVehicleRoutes);
app.use('/api/categories', publicCategoryRoutes);
app.use('/api/service-types', publicServiceTypeRoutes);

// Private routes (require auth)
app.use('/api/admin/vehicles', privateVehicleRoutes);
app.use('/api/admin/categories', privateCategoryRoutes);
app.use('/api/admin/users', privateUserRoutes);
app.use('/api/admin/service-types', privateServiceTypeRoutes);
app.use('/api/admin/conductores', privateConductorRoutes);
app.use('/api/admin/asignaciones', privateAsignacionRoutes);

// Fallback to index.html for Single Page Applications (SPA)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/api-docs')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;
