'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var socialValues = function socialValues(sequelize, DataTypes) {
  var socialvalues = sequelize.define('social_values', {
    recipeId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    upvotes: { type: DataTypes.INTEGER },
    downvotes: { type: DataTypes.INTEGER },
    replies: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
  socialvalues.associate = function (models) {
    socialvalues.belongsTo(models.recipes, {
      foreignKey: 'recipeId'
    });
  };
  return socialvalues;
};
exports.default = socialValues;