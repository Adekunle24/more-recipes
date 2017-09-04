
module.exports = {  up : (queryInterface, Sequelize) => {
  queryInterface.createTable('votes', {
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
        key: 'id',
        as: 'recipeId',
      }
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      }
    },
    upvote: {
      type: Sequelize.INTEGER
    },
    downvote: {
      type: Sequelize.INTEGER
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
down : (queryInterface) =>
  queryInterface.dropTable('reviews'),
};
