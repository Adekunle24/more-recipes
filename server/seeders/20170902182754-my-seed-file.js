
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
"id","email","emailConfirmed","password","phoneNumber","phoneNumberVerified","accessFailedCount","username","createdAt","updatedAt"

      Example: */
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
      password : '$2a$10$ibbi.ll8eeeVLA0mhll9Lupv5XQa2dNBF701TNhbYUnWkG3M9LR6a',
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
