const { Model, DataTypes } = require('sequelize');

class Book extends Model {
    static init(sequelize) {
        super.init({
            id: DataTypes.INTEGER,
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
}

module.exports = User;