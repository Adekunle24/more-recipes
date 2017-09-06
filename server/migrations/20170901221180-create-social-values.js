
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('social_values', {
      recipeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          key: 'id',
          as: 'recipeId',
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
  down: queryInterface =>
    queryInterface.dropTable('social_values'),
};
