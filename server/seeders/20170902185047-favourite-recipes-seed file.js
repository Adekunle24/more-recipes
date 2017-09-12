
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('favourite_recipes', [{
      recipeId: '1',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '1',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '2',
      userId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      recipeId: '2',
      userId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down(queryInterface, Sequelize) {
  }
};
