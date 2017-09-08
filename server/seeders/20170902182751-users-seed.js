
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'adekunle24@gmail.com',
      emailConfirmed : 0,
      password : '$2a$10$cXerO3ryrkWettd56infv.iZ2yLrw8Kthq1M5ikECHXuDHEADWYxG',
      phoneNumber : '',
      phoneNumberVerified : 0,
      accessFailedCount : 0,
      username : 'Adekunle',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      email: 'andela@gmail.com',
      emailConfirmed : 0,
      password : '$2a$10$E03v7fwra6lJ5Pm3A.i2kuybTtZy3SHoqwWutVJxXMyg8/FYvP2Qu',
      phoneNumber : '',
      phoneNumberVerified : 0,
      accessFailedCount : 0,
      username : 'Andela',
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ], {});
    
  },

  down: function (queryInterface, Sequelize) {
  }
};
