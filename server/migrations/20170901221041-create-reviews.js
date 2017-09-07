
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          onDelete: 'CASCADE',
          key: 'id',
          as: 'recipeId',
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          onDelete: 'CASCADE',
          key: 'id',
          as: 'userId'
        }
      },
      review: {
        type: Sequelize.STRING
      },
      replies: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface =>
    queryInterface.dropTable('reviews',{
      force: true,
        cascade: false,
    }),
};