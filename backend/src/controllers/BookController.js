const axios = require('axios');
const Book = require('../models/Book');

module.exports = {
    async index(req, res) {
        const books = await Book.findAll();
        return res.json(books);
    },

    async indexById(book_id) {
        const book = await Book.findByPk(book_id);
        return book;
    },

    async store(req, res) {
        const {
            id,
            title,
            authors,
            description,
            categories,
            average_rating,
            ratings_count,
            image
        } = req.body;

        const book = await Book.create({
            id,
            title,
            authors,
            description,
            categories,
            average_rating,
            ratings_count,
            image
        });

        return res.json(book);
    },

    async search(request, response) {
        const { title, author } = request.body;
        const apiKey = "AIzaSyAJuZ1hNfpktAk7BXiH2lQtBlDS9dXxDtM";
        let books = [];

        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${apiKey}&maxResults=40`)
            .then(res => {
                if (res.data.items.length > 0) {
                    books = res.data.items;
                }
            });

        return response.json(books);
    }
}