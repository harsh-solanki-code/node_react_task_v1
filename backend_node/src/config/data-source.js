require('reflect-metadata');
const { DataSource } = require('typeorm');

const User = require('../entity/User');
const Booking = require('../entity/Booking');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [User, Booking],
  synchronize: true,
  logging: false,
});

module.exports = AppDataSource;
