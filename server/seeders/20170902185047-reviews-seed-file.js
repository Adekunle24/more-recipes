
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      "id","title","createdAt","updatedAt","userId","procedures","ingredients"
9,"How to make Pizza with flour","2017-08-31 17:07:08.763+00","2017-09-01 11:02:09.894+00",11,"Grind the flour and mix with water and oil and allow to wait for an hour.. Allow to stay for an hour","""{\""item\"":\""melon\"",'quantity':'1 cup'}"""

*/
    return queryInterface.bulkInsert('reviews', [{
      recipeId : '1',
      userId : '1',
      review : 'I love the recipe',
      replies : '{}',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      recipeId : '2',
      userId : '2',
      review : 'The recipe is mixing an ingredient',
      replies : '{}',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      recipeId : '1',
      userId : '1',
      review : 'I tried the recipe and all my family enjoyed it especially when i added plenty onions',
      replies : '{}',
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ], {});
    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
