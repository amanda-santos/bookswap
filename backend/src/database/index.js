const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
// const Purchase = require('../models/Purchase');

const connection = new Sequelize(dbConfig);

User.init(connection);
// Purchase.init(connection);

module.exports = connection;