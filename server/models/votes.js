'use strict';
module.exports = function(sequelize, DataTypes) {
  var votes = sequelize.define('votes', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return votes;
};