const express = require('express');
const UserController = require('./controllers/UserController');
// const PurchasesController = require('./controllers/PurchasesController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
// routes.post('/purchase', PurchasesController.store);

module.exports = routes;