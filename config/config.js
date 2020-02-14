require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'development',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'development',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'development',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
  },
};
