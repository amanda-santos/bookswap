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

routes.get('/user/:user_id/book/:book_id', BooksUsersController.indexBook);
routes.get('/user/:user_id/books', BooksUsersController.indexBooks);
routes.post('/user/:user_id/book/:book_id', BooksUsersController.store);
routes.put('/user/:user_id/book/:book_id', BooksUsersController.update);

module.exports = routes;