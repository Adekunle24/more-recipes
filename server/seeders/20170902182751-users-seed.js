
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'hellorecipes@gmail.com',
      emailConfirmed : 0,
      password : 'eyJhbGciOiJIUzI1NiJ9.YWxwaGE.E5KN2A9IGGQm0jJEptGoZQJPUCoroCNpAdF5vCd0z70',//alpha
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
      password : 'eyJhbGciOiJIUzI1NiJ9.b21lZ2E.wNvC1fS2A09FZOq4cg8gRcAQqujJHFATVxFWgIfu8fQ',//omega
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
