'use strict';
module.exports = function(sequelize, DataTypes) {
  var recipes = sequelize.define('recipes', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return recipes;
};