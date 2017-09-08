
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('recipes', [{
      title : 'How to make Pounded yam',
      userId : '2',
      procedures : 'Peel the yam, and boil for 30 minutes. Wash your mortar and pestle then pound',
      ingredients : '[{ "item" :"yam","quantity":"3 pieces"}]',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'How to make Melon Soup',
      userId : '1',
      procedures : 'Grind the melon seed and mix with water and oil.. Allow to stay for an hour',
      ingredients : '[{ "item" :"melon","quantity":"1 cup"}]',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'How to make Fried rice',
      userId : '2',
      procedures : 'Cook white rice as usual and mix with water and oil.. Allow to stay for an hour',
      ingredients : '[{ "item" :"thyme","quantity":"1 cup"},{ "item" :"palmoil","quantity":"half litre"}]',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'How to make Pizza with flour',
      userId : '1',
      procedures : 'Grind the flour and mix with water and oil and allow to wait for an hour.. Allow to stay for an hour',
      ingredients : '[{ "item" :"flour","quantity":"1 cup"}]',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'How to make Pizza with flour',
      userId : '1',
      procedures : 'Grind the flour and mix with water and oil and allow to wait for an hour.. Allow to stay for an hour',
      ingredients : '[{ "item" :"flour","quantity":"1 cup"}]',
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ], {});
    
  },

  down: function (queryInterface, Sequelize) {
   
  }
};
