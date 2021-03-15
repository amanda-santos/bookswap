const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            bio: DataTypes.TEXT,
            profile_picture: DataTypes.STRING,
            books_swapped: DataTypes.INTEGER,
            reputation: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}

module.exports = User;