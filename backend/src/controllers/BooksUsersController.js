const Book = require('../models/Book');
const BooksUsers = require('../models/BooksUsers');
const User = require('../models/User');
const BookController = require('./BookController');

module.exports = {
    async indexBook(req, res) {
        const { user_id } = req.params;
        const { book_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const book = await Book.findByPk(book_id);

        if (!book) {
            return res.status(400).json({ error: 'Book not found' });
        }

        const bookUser = await BooksUsers.findAll({
            where: {
                book_id,
                user_id
            }
        });

        return res.json(await Promise.all(
            bookUser.map(async (b) => {
                const bookInfo = await Book.findByPk(b.book_id)
                return { swap: b.swap, favorite: b.favorite, ...bookInfo.dataValues }
            })
        ));
    },

    async indexBooks(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const booksUser = await BooksUsers.findAll({
            where: {
                user_id,
            }
        });

        return res.json(await Promise.all(
            booksUser.map(async (b) => {
                const bookInfo = await Book.findByPk(b.book_id)
                return { swap: b.swap, favorite: b.favorite, ...bookInfo.dataValues }
            })
        ));
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { book_id } = req.params;
        const {
            title,
            authors,
            description,
            categories,
            average_rating,
            ratings_count,
            image,
            swap,
            favorite
        } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const [book] = await Book.findOrCreate({
            where: {
                id: book_id
            },
            defaults: {
                id: book_id,
                title,
                authors,
                description,
                categories,
                average_rating,
                ratings_count,
                image
            }
        })

        const [bookUser] = await BooksUsers.findOrCreate({
            where: {
                user_id,
                book_id,
            },
            defaults: {
                user_id,
                book_id,
                swap,
                favorite
            }
        });

        return res.json({
            title: book.title,
            authors: book.authors,
            description: book.description,
            categories: book.categories,
            average_rating: book.average_rating,
            ratings_count: book.ratings_count,
            image: book.image,
            user_id: bookUser.user_id,
            book_id: bookUser.book_id,
            swap: bookUser.swap,
            favorite: bookUser.favorite
        });
    },

    async update(req, res) {
        const { user_id } = req.params;
        const { book_id } = req.params;
        const {
            swap,
            favorite
        } = req.body;

        let bookUser = await BooksUsers.findAll({
            where: {
                user_id,
                book_id,
            }
        });

        if (!bookUser) {
            return res.status(400).json({ error: 'Book or user not found' });
        }

        await BooksUsers.update(
            { swap, favorite },
            { returning: true, where: { book_id, user_id } }
        ).then(async () => {
            return res.json(await BooksUsers.findAll({
                where: {
                    user_id,
                    book_id,
                }
            }));
        })
    }
}