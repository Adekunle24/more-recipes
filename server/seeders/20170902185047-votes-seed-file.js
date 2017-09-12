
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('votes', [{
      recipeId: '1',
      userId: '1',
      upvote: '1',
      downvote: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '1',
      userId: '1',
      upvote: '0',
      downvote: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '2',
      userId: '2',
      upvote: '1',
      downvote: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '2',
      userId: '2',
      upvote: '0',
      downvote: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down(queryInterface, Sequelize) {
  }
};
