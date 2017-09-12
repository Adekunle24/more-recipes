
module.exports = {
  up: (queryInterface, Sequelize) => {
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
  down: queryInterface =>
    queryInterface.dropTable('social_values', {
      force: true,
      cascade: false,
    }),
};
