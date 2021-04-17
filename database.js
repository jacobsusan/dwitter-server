const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dwitter_app', 'user', 'pass', {
  dialect: 'sqlite',
  host: './dwitter.sqlite',
});

module.exports = sequelize;
