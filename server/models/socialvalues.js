
const socialValues = (sequelize, DataTypes) => {
  const socialvalues = sequelize.define('social_values', {
    recipeId : { type : DataTypes.INTEGER, allowNull : false, primaryKey : true },
    createdAt : { type : DataTypes.DATE, allowNull : false },
    updatedAt : { type : DataTypes.DATE, allowNull : false },
    upvotes : { type: DataTypes.INTEGER },
    downvotes : { type : DataTypes.INTEGER},
    replies : { type : DataTypes.INTEGER, defaultValue : 0}
  });
  socialvalues.associate = (models) => {
    socialvalues.belongsTo(models.recipes, {
      foreignKey: 'recipeId'
    });
  };
  return socialvalues;
};
export default socialValues;