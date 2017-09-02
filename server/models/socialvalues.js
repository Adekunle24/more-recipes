
const socialValues = (sequelize, DataTypes) => {
  const profile = sequelize.define('social_values', {
    recipeId : { type : DataTypes.INTEGER, allowNull : false, primaryKey : true },
    createdAt : { type : DataTypes.DATE, allowNull : false },
    updatedAt : { type : DataTypes.DATE, allowNull : false },
    upvotes : { type: DataTypes.INTEGER },
    downvotes : { type : DataTypes.INTEGER},
    replies : { type : DataTypes.INTEGER}
  });
  profile.associate = (models) => {
    profile.belongsTo(models.recipes, {
      foreignKey: 'id'
    });
  };
  return profile;
};
export default socialValues;