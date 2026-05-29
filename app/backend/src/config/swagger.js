const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VARMAR Vehicle Rental API',
      version: '1.0.0',
      description:
        'REST API for a vehicle rental platform. Public endpoints return only approved & available vehicles. Private endpoints require an **Admin** JWT token.',
      contact: { email: 'admin@barmar.com' },
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local dev server' }],
    tags: [
      { name: 'Auth', description: 'Register, login, current user' },
      { name: 'Vehicles (public)', description: 'Browse vehicles – no auth required' },
      { name: 'Categories (public)', description: 'Browse categories – no auth required' },
      { name: 'Service types (public)', description: 'Browse service types – no auth required' },
      { name: 'Service types (admin)', description: 'Service type management – admin only' },
      { name: 'Vehicles (admin)', description: 'Full vehicle management – admin only' },
      { name: 'Categories (admin)', description: 'Category management – admin only' },
      { name: 'Users (admin)', description: 'User management – admin only' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Paste the token returned by POST /api/auth/login',
        },
      },
      schemas: {
        // ── Reusable objects ────────────────────────────────────────────
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'SUV' },
            description: { type: 'string', example: 'Sport utility vehicles' },
            is_active: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ServiceTypePublic: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Transporte de Pasajeros' },
          },
        },
        ServiceType: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Transporte de Pasajeros' },
            status: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Hilux GR Sport' },
            make: { type: 'string', example: 'Toyota' },
            registration_number: { type: 'string', example: 'ABC-1234' },
            category_id: { type: 'integer', example: 2 },
            category: { $ref: '#/components/schemas/Category' },
            year: { type: 'integer', example: 2023 },
            daily_rate: { type: 'number', format: 'float', example: 85.00 },
            precio_mensual: { type: 'number', format: 'float', example: 2200.00 },
            cantidad_pasajeros: { type: 'integer', example: 5 },
            tipo_transmision: { type: 'string', enum: ['MANUAL', 'AUTOMATICA'], example: 'AUTOMATICA' },
            tipo_combustible: { type: 'string', enum: ['GASOLINA', 'DIESEL', 'ELECTRICO', 'HIBRIDO', 'GNV', 'GLP'], example: 'GASOLINA' },
            tipo_traccion: { type: 'string', enum: ['DELANTERA', 'TRASERA', 'AWD', '4X4', '4X2'], example: 'AWD' },
            current_mileage: { type: 'integer', example: 12400 },
            status: {
              type: 'string',
              enum: ['AVAILABLE', 'RENTED', 'MAINTENANCE'],
              example: 'AVAILABLE',
            },
            is_approved: { type: 'boolean', example: true },
            image: { type: 'string', example: 'a3f9c1d2.jpg' },
            description: { type: 'string', example: 'Full option, leather seats' },
            equipamiento: {
              type: 'array',
              items: { type: 'string' },
              example: ['Aire acondicionado', 'Bluetooth', 'Cámara de retroceso'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', format: 'email', example: 'admin@barmar.com' },
            role: { type: 'string', enum: ['admin', 'user'], example: 'admin' },
            is_active: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 38 },
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 12 },
            totalPages: { type: 'integer', example: 4 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Resource not found' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
      // ── Reusable query parameters ────────────────────────────────────
      parameters: {
        pageParam: {
          name: 'page', in: 'query', schema: { type: 'integer', default: 1 },
          description: 'Page number',
        },
        limitParam: {
          name: 'limit', in: 'query', schema: { type: 'integer', default: 12, maximum: 100 },
          description: 'Results per page (max 100)',
        },
        sortByParam: {
          name: 'sort_by', in: 'query',
          schema: {
            type: 'string',
            enum: ['name', 'make', 'year', 'daily_rate', 'current_mileage', 'createdAt'],
            default: 'createdAt',
          },
        },
        sortOrderParam: {
          name: 'sort_order', in: 'query',
          schema: { type: 'string', enum: ['ASC', 'DESC'], default: 'DESC' },
        },
        vehicleFilters: {
          // individual params declared inline in each route for clarity
        },
      },
    },
  },
  apis: ['./src/routes/**/*.js'],
};

module.exports = swaggerJsdoc(options);
