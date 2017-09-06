
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'hellorecipes@gmail.com',
      emailConfirmed : 0,
      password : '$2a$10$9HA26AuOA3/BQXEynwhN6.Y6o9G7tivQG.hJA0whDv8RZ1IXQv4ka',
      phoneNumber : '',
      phoneNumberVerified : 0,
      accessFailedCount : 0,
      username : 'makevalidations',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      email: 'andela@gmail.com',
      emailConfirmed : 0,
      password : '$2a$10$ibbi.ll8eeeVLA0mhll9Lupv5XQa2dNBF701TNhbYUnWkG3M9LR6a',//password
      phoneNumber : '',
      phoneNumberVerified : 0,
      accessFailedCount : 0,
      username : 'andela',
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ], {});
    
  },

  down: function (queryInterface, Sequelize) {
  }
};
