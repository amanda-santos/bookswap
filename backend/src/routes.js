const express = require('express');

const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');
const BooksUsersController = require('./controllers/BooksUsersController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/user/:id', UserController.update);

routes.get('/books', BookController.index);
routes.post('/books', BookController.store);
routes.post('/books/search', BookController.search);

routes.get('/book/:book_id/user/:user_id', BooksUsersController.index);
routes.post('/book/:book_id/user/:user_id', BooksUsersController.store);
routes.put('/book/:book_id/user/:user_id', BooksUsersController.update);

module.exports = routes;