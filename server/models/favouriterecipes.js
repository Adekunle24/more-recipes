
const favouriteRecipes = (sequelize, DataTypes) => {
  const favourites = sequelize.define('favourite_recipes', {
    recipeId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  favourites.associate = (models) => {
    favourites.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    favourites.hasOne(models.users, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return favourites;
};
export default favouriteRecipes;