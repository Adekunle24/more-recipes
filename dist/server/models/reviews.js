'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Reviews = function Reviews(sequelize, DataTypes) {
  var review = sequelize.define('reviews', {
    recipeId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    replies: { type: DataTypes.STRING, allowNull: true },
    review: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  review.associate = function (models) {
    review.belongsTo(models.recipes, {
      foreignKey: 'recipeId'
    });
  };
  return review;
};
exports.default = Reviews;