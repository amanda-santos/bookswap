const { Model, DataTypes } = require('sequelize');

class Book extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            title: DataTypes.STRING,
            authors: DataTypes.JSON,
            description: DataTypes.TEXT,
            categories: DataTypes.JSON,
            average_rating: DataTypes.INTEGER,
            ratings_count: DataTypes.INTEGER,
            image: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'user_id', through: 'books_users', as: 'users' });
    }
}

module.exports = Book;