
const Reviews = (sequelize, DataTypes) => {
  const review = sequelize.define('reviews', {
    recipeId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    replies: { type: DataTypes.STRING, allowNull: true },
    review: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  review.associate = (models) => {
    review.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'cascade'
    });
  };
  return review;
};
export default Reviews;
