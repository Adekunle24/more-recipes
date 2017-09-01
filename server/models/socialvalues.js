'use strict';
module.exports = function(sequelize, DataTypes) {
  var socialValues = sequelize.define('socialValues', {
    recipeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return socialValues;
};