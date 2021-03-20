'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('books_users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      book_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'books', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      swap: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('books_users');
  }
};
