'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersProfile = sequelize.define('usersProfile', {
    firstName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersProfile;
};