const { Model, DataTypes } = require('sequelize');

class BooksUsers extends Model {
    static init(sequelize) {
        super.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            book_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            swap: DataTypes.BOOLEAN,
            favorite: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }
}

module.exports = BooksUsers;