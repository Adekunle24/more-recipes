
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('social_values', [{
      recipeId : '1',
      upvotes : '0',
      downvotes : '0',
      replies : '0',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      recipeId : '2',
      upvotes : '0',
      downvotes : '0',
      replies : '0',
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ], {});
    
  },

  down: function (queryInterface, Sequelize) {
   
  }
};