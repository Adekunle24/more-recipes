'use strict';
module.exports = function(sequelize, DataTypes) {
  var favouriteRecipes = sequelize.define('favouriteRecipes', {
    id: {
      type: DataTypes.STRING,
      primaryKey : true,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favouriteRecipes;
};