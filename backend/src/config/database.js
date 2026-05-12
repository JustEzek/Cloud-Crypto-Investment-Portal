const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'investment_portal',
  process.env.DB_USER || 'portal_user',
  process.env.DB_PASSWORD || 'portal_password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
