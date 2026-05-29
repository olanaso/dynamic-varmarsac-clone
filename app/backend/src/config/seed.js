require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const { sequelize, User, Category, Vehicle, ServiceType } = require('../models');

const serviceTypes = [
  { name: 'Transporte de Pasajeros' },
  { name: 'Carga y Logística' },
  { name: 'Turismo y Recreación' },
  { name: 'Ejecutivo Empresarial' },
  { name: 'Transporte Escolar' },
  { name: 'Mudanzas' },
  { name: 'Aeropuerto' },
  { name: 'Mensajería' },
];

const categories = [
  { name: 'Sedan',        description: 'Compact and mid-size sedans' },
  { name: 'Pickup Truck', description: 'Light and heavy duty trucks' },
  { name: 'SUV',          description: 'Sport utility vehicles' },
  { name: 'Van',          description: 'Cargo and passenger vans' },
  { name: 'Motorcycle',   description: 'Sport and touring motorcycles' },
  { name: 'Electric',     description: 'Fully electric and plug-in hybrid vehicles' },
];

const vehicles = [
  // Sedans (category_id: 1)
  {
    name: 'Civic Sport', make: 'Honda', registration_number: 'DEF-5678',
    category_id: 1, year: 2022, daily_rate: 45.00, current_mileage: 28000,
    status: 'AVAILABLE', is_approved: true,
    description: 'Turbo 1.5, sunroof, apple carplay',
  },
  {
    name: 'Corolla XSE', make: 'Toyota', registration_number: 'JKL-3456',
    category_id: 1, year: 2021, daily_rate: 40.00, current_mileage: 42000,
    status: 'AVAILABLE', is_approved: true,
    description: 'Automatic, backup camera, lane assist',
  },
  {
    name: 'Sentra SR', make: 'Nissan', registration_number: 'MNO-7890',
    category_id: 1, year: 2023, daily_rate: 38.00, current_mileage: 11000,
    status: 'RENTED', is_approved: true,
    description: 'Sporty trim, apple carplay, android auto',
  },
  // Pickup Trucks (category_id: 2)
  {
    name: 'Hilux GR Sport', make: 'Toyota', registration_number: 'ABC-1234',
    category_id: 2, year: 2023, daily_rate: 85.00, current_mileage: 12400,
    status: 'AVAILABLE', is_approved: true,
    description: 'Full option, leather seats, 4x4',
  },
  {
    name: 'Ranger Raptor', make: 'Ford', registration_number: 'PQR-1122',
    category_id: 2, year: 2023, daily_rate: 95.00, current_mileage: 8500,
    status: 'AVAILABLE', is_approved: true,
    description: '4x4, off-road package, tow package',
  },
  {
    name: 'D-Max X-Series', make: 'Isuzu', registration_number: 'STU-3344',
    category_id: 2, year: 2022, daily_rate: 70.00, current_mileage: 31000,
    status: 'MAINTENANCE', is_approved: true,
    description: 'Diesel 4x4, currently in scheduled maintenance',
  },
  // SUVs (category_id: 3)
  {
    name: 'X5 xDrive40i', make: 'BMW', registration_number: 'GHI-9012',
    category_id: 3, year: 2024, daily_rate: 180.00, current_mileage: 3200,
    status: 'AVAILABLE', is_approved: false,
    description: 'Pending approval – dealer submission',
  },
  {
    name: 'RAV4 Adventure', make: 'Toyota', registration_number: 'VWX-5566',
    category_id: 3, year: 2022, daily_rate: 75.00, current_mileage: 24000,
    status: 'AVAILABLE', is_approved: true,
    description: 'AWD, panoramic roof, JBL audio',
  },
  {
    name: 'Tucson N-Line', make: 'Hyundai', registration_number: 'YZA-7788',
    category_id: 3, year: 2023, daily_rate: 68.00, current_mileage: 17500,
    status: 'AVAILABLE', is_approved: true,
    description: 'Turbo hybrid, sport design package',
  },
  // Vans (category_id: 4)
  {
    name: 'Sprinter 2500', make: 'Mercedes-Benz', registration_number: 'BCD-9900',
    category_id: 4, year: 2021, daily_rate: 120.00, current_mileage: 55000,
    status: 'AVAILABLE', is_approved: true,
    description: '12-passenger, high-roof, ideal for groups',
  },
  // Motorcycles (category_id: 5)
  {
    name: 'CB500F', make: 'Honda', registration_number: 'EFG-1111',
    category_id: 5, year: 2022, daily_rate: 30.00, current_mileage: 9800,
    status: 'AVAILABLE', is_approved: true,
    description: 'Naked sport, ABS, ideal for city use',
  },
  {
    name: 'MT-07', make: 'Yamaha', registration_number: 'HIJ-2222',
    category_id: 5, year: 2023, daily_rate: 35.00, current_mileage: 6200,
    status: 'RENTED', is_approved: true,
    description: '689cc twin, traction control, quick-shift',
  },
  // Electric (category_id: 6)
  {
    name: 'Model 3 LR', make: 'Tesla', registration_number: 'KLM-3333',
    category_id: 6, year: 2023, daily_rate: 110.00, current_mileage: 14500,
    status: 'AVAILABLE', is_approved: true,
    description: '358 mi range, autopilot, over-the-air updates',
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    // Admin user
    const adminExists = await User.findOne({ where: { email: 'admin@barmar.com' } });
    if (!adminExists) {
      await User.create({ email: 'admin@barmar.com', password: 'admin1234', role: 'admin' });
      console.log('Admin user created  →  admin@barmar.com / admin1234');
    }

    // Regular user
    const userExists = await User.findOne({ where: { email: 'jorge@barmar.com' } });
    if (!userExists) {
      await User.create({ email: 'jorge@barmar.com', password: 'user1234', role: 'user' });
      console.log('Regular user created  →  jorge@barmar.com / user1234');
    }

    // Categories
    const createdCategories = [];
    for (const cat of categories) {
      const [instance] = await Category.findOrCreate({ where: { name: cat.name }, defaults: cat });
      createdCategories.push(instance);
    }
    console.log(`${createdCategories.length} categories seeded.`);

    // Vehicles
    let vehicleCount = 0;
    for (const v of vehicles) {
      const specs = {
        precio_mensual: Math.round(v.daily_rate * 25 * 100) / 100,
        cantidad_pasajeros: v.category_id === 4 ? 12 : v.category_id === 5 ? 2 : 5,
        tipo_transmision: v.category_id === 5 ? 'MANUAL' : 'AUTOMATICA',
        tipo_combustible: v.category_id === 6 ? 'ELECTRICO' : 'GASOLINA',
        tipo_traccion: /4x4|AWD/i.test(v.description || '') ? '4X4' : 'DELANTERA',
        equipamiento: [],
      };
      const [, created] = await Vehicle.findOrCreate({
        where: { registration_number: v.registration_number },
        defaults: { ...v, ...specs },
      });
      if (created) vehicleCount++;
    }
    console.log(`${vehicleCount} vehicles seeded.`);

    // Service Types
    let stCount = 0;
    for (const st of serviceTypes) {
      const [, created] = await ServiceType.findOrCreate({ where: { name: st.name }, defaults: st });
      if (created) stCount++;
    }
    console.log(`${stCount} service types seeded.`);

    console.log('\nSeed complete. Swagger docs at http://localhost:3000/api-docs');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
