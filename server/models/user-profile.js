'use strict';
module.exports = function(sequelize, DataTypes) {
  var user - profile = sequelize.define('user-profile', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user - profile;
};