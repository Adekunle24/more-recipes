
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('reviews', [{
      recipeId: '1',
      userId: '1',
      review: 'I love the recipe',
      replies: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '2',
      userId: '2',
      review: 'The recipe is mixing an ingredient',
      replies: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '1',
      userId: '2',
      review: 'I tried the recipe and all my family enjoyed it especially when i added plenty onions',
      replies: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down(queryInterface, Sequelize) {

  }
};
