'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users_profile', [{
      userId: 1,
      firstName: '',
      lastName: '',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      firstName: '',
      lastName: '',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function down(queryInterface, Sequelize) {}
};