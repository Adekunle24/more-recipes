'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var favouriteRecipes = function favouriteRecipes(sequelize, DataTypes) {
  var favourites = sequelize.define('favourite_recipes', {
    recipeId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  favourites.associate = function (models) {
    favourites.belongsTo(models.recipes, {
      foreignKey: 'recipeId'
    });
    favourites.hasOne(models.users, {
      foreignKey: 'id'
    });
  };
  return favourites;
};
exports.default = favouriteRecipes;