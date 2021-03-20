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
    },

    async update(req, res) {
        const { id } = req.params;
        const {
            name,
            email,
            phone,
            username,
            password,
            bio,
            profile_picture,
            books_swapped,
            reputation
        } = req.body;

        let user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        await User.update(
            {
                name,
                email,
                phone,
                username,
                password,
                bio,
                profile_picture,
                books_swapped,
                reputation
            },
            { returning: true, where: { id } }
        ).then(async () => {
            return res.json(await User.findByPk(id));
        })
    }
}