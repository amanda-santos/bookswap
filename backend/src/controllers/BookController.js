const Book = require('../models/Book');

module.exports = {
    async index(req, res) {
        const books = await Book.findAll();
        return res.json(books);
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
    }
}