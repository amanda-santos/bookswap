const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },

    async store(req, res) {
        const {
            name,
            email,
            phone,
            username,
            password,
            bio,
            profile_picture,
            books_swaped,
            reputation
        } = req.body;

        const user = await User.create({
            name,
            email,
            phone,
            username,
            password,
            bio,
            profile_picture,
            books_swaped,
            reputation
        });

        return res.json(user);
    }
}