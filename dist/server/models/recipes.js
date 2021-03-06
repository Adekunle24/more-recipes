'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Recipe = function Recipe(sequelize, DataTypes) {
  var recipe = sequelize.define('recipes', {
    title: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.TIME, allowNull: true },
    updatedAt: { type: DataTypes.TIME, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    procedures: { type: DataTypes.STRING, allowNull: false },
    ingredients: { type: DataTypes.STRING, allowNull: false, defaultValue: '[{}]' }
  });
  recipe.associate = function (models) {
    recipe.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'users'
    });
    recipe.hasOne(models.social_values, {
      foreignKey: 'recipeId',
      as: 'socialValues'
    });
    recipe.hasMany(models.favourite_recipes, {
      foreignKey: 'id',
      as: 'favourites'
    });
    recipe.hasMany(models.votes, {
      foreignKey: 'id',
      as: 'votes'
    });
  };
  return recipe;
};
exports.default = Recipe;