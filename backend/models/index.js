const sequelize = require('../config/database');
const News = require('./News');

const db = {
  sequelize,
  News
};

module.exports = db;
