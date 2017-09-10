'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.createTable('social_values', {
      recipeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'recipes',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      upvotes: { type: Sequelize.INTEGER },
      downvotes: { type: Sequelize.INTEGER },
      replies: { type: Sequelize.INTEGER }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('social_values', {
      force: true,
      cascade: false });
  }
};