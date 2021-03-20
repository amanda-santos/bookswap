const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Book = require('../models/Book');
const BooksUsers = require('../models/BooksUsers');

const connection = new Sequelize(dbConfig);

User.init(connection);
Book.init(connection);
BooksUsers.init(connection);

module.exports = connection;