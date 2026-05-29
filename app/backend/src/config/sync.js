require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mysql = require('mysql2/promise');
const { sequelize } = require('../models');

async function sync() {
  try {
    // Establish connection to MySQL server to ensure database exists
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.end();
    console.log(`Database "${process.env.DB_NAME}" ensured (created if not existed).`);

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Sync failed:', err);
    process.exit(1);
  }
}

sync();
