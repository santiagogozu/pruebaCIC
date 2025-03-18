const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('infosave', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
