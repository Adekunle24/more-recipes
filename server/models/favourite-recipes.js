'use strict';
module.exports = function(sequelize, DataTypes) {
  var favourite - recipes = sequelize.define('favourite-recipes', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favourite - recipes;
};